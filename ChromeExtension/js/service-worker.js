var creatingOffscreen;
async function offscreen(operation, data) {
    var contexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [chrome.runtime.getURL('offscreen.html')]
    });
    if (!contexts.length) {
        if (!creatingOffscreen) {
            creatingOffscreen = chrome.offscreen.createDocument({
                url: 'offscreen.html', reasons: ['LOCAL_STORAGE', 'CLIPBOARD'],
                justification: 'Read existing Geniuslink settings and copy newly created links.'
            }).finally(function () { creatingOffscreen = null; });
        }
        await creatingOffscreen;
    }
    var result = await chrome.runtime.sendMessage(Object.assign({ target: 'offscreen', operation: operation }, data));
    if (!result || result.error) throw new Error(result && result.error || 'Could not access extension settings.');
    return result;
}

// 1.0.6 kept settings in chrome.storage.local. Copy them once into the popup's localStorage;
// the originals stay in chrome.storage.local. See migrate in offscreen.js for which values win.
var LEGACY_SETTINGS = ['apiKey', 'apiSecret', 'defaultGroup', 'defaultGroupId', 'selectedDomainName',
    'createdLinks', 'doneReview', 'installDate', 'wrongKeys', 'lastCreatedLink', 'groups', 'groupsIds'];
async function migrateLegacySettings(fromV106) {
    var stored = await chrome.storage.local.get(LEGACY_SETTINGS.concat('legacySettingsMigrated'));
    if (stored.legacySettingsMigrated) return;
    var values = {};
    LEGACY_SETTINGS.forEach(function (key) {
        // 1.0.6 could store createdLinks as NaN, which chrome.storage returns as null.
        if (stored[key] !== undefined && stored[key] !== null) values[key] = String(stored[key]);
    });
    if (Object.keys(values).length) await offscreen('migrate', { values: values, overwrite: fromV106 });
    await chrome.storage.local.set({ legacySettingsMigrated: true });
}

var configuring = Promise.resolve();
function configure(fromV106) {
    // Serialize menu rebuilds when several popup pages request an update.
    configuring = configuring.catch(function () {}).then(async function () {
        // A failed migration is retried on the next configure instead of blocking the extension.
        await migrateLegacySettings(fromV106).catch(console.error);
        var settings = (await offscreen('settings')).settings;
        var configured = settings.apiKey && settings.apiSecret && settings.defaultGroupId;
        var reviewDue = Date.now() - new Date(settings.installDate).getTime() >= 14 * 86400000 &&
            Number(settings.createdLinks) > 3 && settings.doneReview === 'false';
        await chrome.action.setPopup({ popup: configured && settings.wrongKeys !== 'true' ?
            (reviewDue ? 'groupsReview.html' : 'groups.html') : 'apikeys.html' });
        await chrome.contextMenus.removeAll();
        if (configured) {
            chrome.contextMenus.create({ id: 'child1', title: 'Create geni.us link from current tab', contexts: ['page'] });
            chrome.contextMenus.create({ id: 'child2', title: 'Create geni.us link from selected URL', contexts: ['link'] });
        }
    });
    return configuring;
}

async function notifyTab(tabId, message) {
    if (tabId === undefined) return;
    // Restricted pages and tabs opened before installation may have no content script.
    try { await chrome.tabs.sendMessage(tabId, message); } catch (error) { /* Popup/badge remains available. */ }
}

async function createLink(url, tabId, outside) {
    if (!/^https?:\/\//i.test(url || '')) throw new Error('Open a regular web page to create a link.');
    var settings = (await offscreen('settings')).settings;
    if (!settings.apiKey || !settings.apiSecret || !settings.defaultGroupId) {
        throw new Error('Open the Geniuslink extension and save your API keys and group first.');
    }
    var groupId = Number(settings.defaultGroupId);
    if (!Number.isInteger(groupId) || groupId < 0) throw new Error('Please select a valid Geniuslink group.');
    if (outside) await notifyTab(tabId, { action: 'loading' });
    // v3 uses authentication headers, a JSON body, and camelCase response fields.
    var response = await fetch('https://api.geni.us/v3/shorturls', {
        method: 'POST',
        headers: {
            'X-Api-Key': settings.apiKey.trim(), 'X-Api-Secret': settings.apiSecret.trim(),
            'Content-Type': 'application/json', 'Accept': 'application/json'
        },
        body: JSON.stringify({ groupId: groupId, domain: settings.selectedDomainName || 'geni.us', url: url }),
        signal: AbortSignal.timeout(20000)
    });
    var data;
    try { data = await response.json(); } catch (error) { /* Handle non-JSON gateway responses below. */ }
    var status = data && (data.responseStatus || data.ResponseStatus);
    var errorCode = status && (status.errorCode || status.ErrorCode);
    if (!response.ok || errorCode) {
        var detail = status && (status.message || status.Message || errorCode);
        if (typeof detail === 'string') {
            // Never echo credentials, even if an API error includes them.
            [settings.apiKey, settings.apiSecret, settings.apiKey.trim(), settings.apiSecret.trim()].forEach(function (secret) {
                if (secret) detail = detail.split(secret).join('[redacted]');
            });
            detail = detail.slice(0, 400);
        } else {
            detail = response.status === 401 ? 'Check your API Key, Secret, and API access.' :
                response.status === 403 ? 'Check your account permissions and link limits.' :
                'The API could not process this request. Please try again.';
        }
        throw new Error('Geniuslink API (HTTP ' + response.status + '): ' + detail);
    }
    var shortUrl = data && (data.shortUrl || data.ShortUrl);
    var domain = shortUrl && (shortUrl.domain || shortUrl.Domain);
    var code = shortUrl && (shortUrl.code || shortUrl.Code);
    if (typeof domain !== 'string' || typeof code !== 'string' || !domain || !code) {
        throw new Error('Geniuslink returned an unexpected response (HTTP ' + response.status +
            '). Check your dashboard before retrying; the link may have been created.');
    }
    var parsed = new URL(/^https?:\/\//i.test(domain) ? domain : 'http://' + domain);
    if (parsed.hostname === 'geni.us' || parsed.hostname.endsWith('.geni.us')) parsed.protocol = 'https:';
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Invalid shortlink domain.');
    var link = parsed.origin + '/' + code;
    var result = await offscreen('saveLink', { url: link });
    await chrome.action.setBadgeText({ text: '' });
    await chrome.action.setTitle({ title: 'Geniuslink | Intelligent Link Creator' });
    if (outside) await notifyTab(tabId, { action: 'linkCreated', url: link, copied: result.copied });
    return { url: link, copied: result.copied };
}

chrome.runtime.onInstalled.addListener(function (details) {
    // Users updating straight from 1.0.6 never saved settings in 1.0.7, so their 1.0.6 values are newest.
    configure(details.reason === 'update' && details.previousVersion === '1.0.6').catch(console.error);
});
chrome.runtime.onStartup.addListener(function () { configure().catch(console.error); });
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId !== 'child1' && info.menuItemId !== 'child2') return;
    createLink(info.menuItemId === 'child2' ? info.linkUrl : (info.pageUrl || tab.url), tab.id, true)
        .catch(async function (error) {
            await chrome.action.setBadgeText({ text: '!' });
            await chrome.action.setTitle({ title: error.message });
            await notifyTab(tab.id, { action: 'linkError', message: error.message });
        });
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.target === 'offscreen') return;
    // Only our popup pages can initiate privileged operations.
    if (sender.id !== chrome.runtime.id || !sender.url || !sender.url.startsWith(chrome.runtime.getURL(''))) return;
    var task;
    if (message.name === 'CreateContentMenus') task = configure().then(function () { return { ok: true }; });
    if (message.name === 'CreateCurrentLink') {
        task = chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(function (tabs) {
            if (!tabs[0]) throw new Error('No active browser tab.');
            return createLink(tabs[0].url, tabs[0].id, false);
        });
    }
    if (!task) return;
    task.then(sendResponse, function (error) { sendResponse({ error: error.message }); });
    return true;
});
