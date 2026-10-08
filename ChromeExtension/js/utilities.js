function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage[val] !== '';
}

// While a 1.0.6 overwrite migration is pending (its first attempt failed), record the settings as they
// were before the user could change anything here, so a retry never replaces settings saved since.
if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['legacySettingsPending', 'legacySettingsMigrated', 'legacySettingsBaseline']).then(function (stored) {
        if (!stored.legacySettingsPending || !stored.legacySettingsPending.overwrite ||
            stored.legacySettingsMigrated || stored.legacySettingsBaseline) return;
        var baseline = {};
        for (var i = 0; i < localStorage.length; i++) baseline[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
        return chrome.storage.local.set({ legacySettingsBaseline: baseline });
    }).catch(function () { /* The migration then overwrites as decided by onInstalled. */ });
}

if (location.pathname === '/alertDoneInside.html' || location.pathname === '/alertDoneOutside.html') {
    var params = new URLSearchParams(location.hash.slice(1));
    var lastCreatedLink = params.get('url') || localStorage['lastCreatedLink'];
    document.getElementById('lastCreatedLink').textContent = lastCreatedLink || '';
    if (lastCreatedLink) {
        var linkPath = new URL(lastCreatedLink).pathname.slice(1);
        document.getElementById('dashboardLink').href = 'https://my.geniuslink.com/links#!editlink=' + encodeURIComponent(linkPath);
    }
    if (params.get('copied') === 'false') {
        document.querySelector('.successText').textContent = 'Link created. Automatic copy failed; select and copy the link above.';
    }
}
