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
        }
    } catch (error) { sendResponse({ error: error.message }); }
});
