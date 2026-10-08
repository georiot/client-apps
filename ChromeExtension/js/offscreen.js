// Preserve popup settings. Only Web Storage and clipboard DOM work lives here.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.target !== 'offscreen' || sender.id !== chrome.runtime.id || sender.tab) return;
    try {
        if (message.operation === 'settings') {
            var defaults = {
                createdLinks: '0', doneReview: 'false', selectedDomainName: 'geni.us',
                installDate: new Date().toLocaleDateString('en-US')
            };
            Object.keys(defaults).forEach(function (key) {
                if (localStorage.getItem(key) === null) localStorage.setItem(key, defaults[key]);
            });
            var settings = {};
            ['apiKey', 'apiSecret', 'defaultGroup', 'defaultGroupId', 'selectedDomainName',
                'createdLinks', 'doneReview', 'installDate', 'wrongKeys'].forEach(function (key) {
                settings[key] = localStorage.getItem(key);
            });
            sendResponse({ settings: settings });
        } else if (message.operation === 'saveLink') {
            localStorage.setItem('lastCreatedLink', message.url);
            localStorage.setItem('createdLinks', (Number(localStorage.getItem('createdLinks')) || 0) + 1);
            var input = document.getElementById('clipboard');
            input.value = message.url;
            input.select();
            var copied = document.execCommand('copy');
            input.value = '';
            sendResponse({ copied: copied });
        } else if (message.operation === 'migrate') {
            // 1.0.7 shipped without this migration, so its users may have re-saved settings since.
            // Keep those and only fill gaps, unless updating straight from 1.0.6 or no API key was
            // ever saved here (then localStorage holds only 1.0.7's defaults).
            var savedKey = localStorage.getItem('apiKey');
            var overwrite = message.overwrite || !savedKey;
            // After a failed attempt, popup pages record a baseline before the user can change anything;
            // a setting that differs from it was saved since and is never overwritten.
            var baseline = message.baseline;
            var unchanged = function (key) {
                return !baseline || localStorage.getItem(key) === (key in baseline ? baseline[key] : null);
            };
            var writable = function (key) {
                return overwrite ? unchanged(key) : localStorage.getItem(key) === null;
            };
            // Account settings belong together: keep all of them if the user changed any since the baseline.
            var accountSettings = ['apiKey', 'apiSecret', 'defaultGroup', 'defaultGroupId', 'selectedDomainName',
                'groups', 'groupsIds', 'wrongKeys'];
            var accountChanged = overwrite && accountSettings.some(function (key) { return !unchanged(key); });
            // The popup saves apiKey as it is typed, so it may belong to another account.
            // Never combine that account's key with 1.0.6's secret, group, or domain.
            var finalKey = !accountChanged && 'apiKey' in message.values && writable('apiKey') ?
                message.values.apiKey : savedKey;
            var sameAccount = finalKey === message.values.apiKey;
            Object.keys(message.values).forEach(function (key) {
                var account = accountSettings.indexOf(key) !== -1;
                if (!writable(key) || (account && (accountChanged || (key !== 'apiKey' && !sameAccount)))) return;
                localStorage.setItem(key, message.values[key]);
            });
            sendResponse({ ok: true });
        }
    } catch (error) { sendResponse({ error: error.message }); }
});
