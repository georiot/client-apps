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
            // The popup saves apiKey as it is typed, so it may belong to another account.
            // Never fill that account's secret, group, or domain from 1.0.6.
            var sameAccount = savedKey === message.values.apiKey;
            var accountSettings = ['apiSecret', 'defaultGroup', 'defaultGroupId', 'selectedDomainName',
                'groups', 'groupsIds', 'wrongKeys'];
            Object.keys(message.values).forEach(function (key) {
                if (overwrite || (localStorage.getItem(key) === null &&
                    (sameAccount || accountSettings.indexOf(key) === -1))) {
                    localStorage.setItem(key, message.values[key]);
                }
            });
            sendResponse({ ok: true });
        }
    } catch (error) { sendResponse({ error: error.message }); }
});
