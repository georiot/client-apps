// 1.0.6 kept settings in chrome.storage.local; later versions use the popup's localStorage (GL-2619).
// Shared by the service worker (importScripts), the offscreen document, and the popup pages.
var LEGACY_SETTINGS = ['apiKey', 'apiSecret', 'defaultGroup', 'defaultGroupId', 'selectedDomainName',
    'createdLinks', 'doneReview', 'installDate', 'wrongKeys', 'lastCreatedLink', 'groups', 'groupsIds'];
var LEGACY_ACCOUNT_SETTINGS = ['apiSecret', 'defaultGroup', 'defaultGroupId', 'selectedDomainName',
    'groups', 'groupsIds', 'wrongKeys'];
var LEGACY_STATE = ['legacySettingsMigrated', 'legacySettingsPending'];

// The 1.0.6 values to copy and how, or null when no migration is pending. Only onInstalled knows the
// previous version, so a migration waits for its saved decision (see onInstalled in service-worker.js).
function pendingLegacySettings(stored) {
    if (stored.legacySettingsMigrated || !stored.legacySettingsPending) return null;
    var values = {};
    LEGACY_SETTINGS.forEach(function (key) {
        // 1.0.6 could store createdLinks as NaN, which chrome.storage returns as null.
        if (stored[key] !== undefined && stored[key] !== null) values[key] = String(stored[key]);
    });
    return { values: values, overwrite: stored.legacySettingsPending.overwrite };
}

// Copy 1.0.6 values into localStorage; the originals stay in chrome.storage.local. Running it again
// gives the same result, so a retry after a partial failure completes it.
function applyLegacySettings(storage, values, overwrite) {
    // 1.0.7 shipped without this migration, so its users may have re-saved settings since.
    // Keep those and only fill gaps, unless updating straight from 1.0.6 or no API key was
    // ever saved here (then localStorage holds only 1.0.7's defaults).
    var savedKey = storage.getItem('apiKey');
    overwrite = overwrite || !savedKey;
    // The popup saves apiKey as it is typed, so it may belong to another account.
    // Never fill that account's secret, group, or domain from 1.0.6.
    var sameAccount = savedKey === values.apiKey;
    // apiKey goes last: until it is written, a retry still sees no saved key and overwrites again.
    Object.keys(values).sort(function (a, b) { return (a === 'apiKey') - (b === 'apiKey'); }).forEach(function (key) {
        if (overwrite || (storage.getItem(key) === null &&
            (sameAccount || LEGACY_ACCOUNT_SETTINGS.indexOf(key) === -1))) {
            storage.setItem(key, values[key]);
        }
    });
}

// Popup pages (the only context with both chrome.storage and localStorage) finish a pending migration
// as soon as they open, then reload to show the restored settings. Settings are therefore never
// edited before the migration has run, even when the service worker's attempt failed.
if (typeof chrome !== 'undefined' && chrome.storage && typeof localStorage !== 'undefined') {
    chrome.storage.local.get(LEGACY_SETTINGS.concat(LEGACY_STATE)).then(function (stored) {
        var pending = pendingLegacySettings(stored);
        if (!pending) return;
        // This page's scripts started with the old settings; for example, groups.js may be loading groups
        // with stale credentials. Drop this page's writes until the reload, so a late response cannot
        // replace the restored settings. The migration writes through the original setItem.
        var setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function () {};
        return Promise.resolve().then(function () {
            applyLegacySettings({
                getItem: function (key) { return localStorage.getItem(key); },
                setItem: function (key, value) { setItem.call(localStorage, key, value); }
            }, pending.values, pending.overwrite);
            return chrome.storage.local.set({ legacySettingsMigrated: true });
        }).then(function () { location.reload(); }, function (error) {
            Storage.prototype.setItem = setItem;
            throw error;
        });
    }).catch(console.error);
}
