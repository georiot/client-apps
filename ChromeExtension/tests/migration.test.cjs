const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Runs the real service worker and offscreen document against in-memory storage.
function setup({ local = {}, chromeStorage = {}, failMigrate = 0 } = {}) {
    const localStorage = new Map(Object.entries(local));
    const storage = { ...chromeStorage };
    const popups = [];
    const listeners = {};
    const event = (name) => ({ addListener(fn) { listeners[name] = fn; } });

    let offscreenListener;
    const offscreenContext = vm.createContext({
        localStorage: {
            getItem: (key) => (localStorage.has(key) ? localStorage.get(key) : null),
            setItem: (key, value) => localStorage.set(key, String(value))
        },
        document: { getElementById: () => ({ select() {} }), execCommand: () => true },
        chrome: { runtime: { id: 'ext', onMessage: { addListener(fn) { offscreenListener = fn; } } } }
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/offscreen.js'), 'utf8'), offscreenContext);

    const context = vm.createContext({
        URL, AbortSignal, console: { ...console, error() {} },
        chrome: {
            runtime: { onInstalled: event('installed'), onStartup: event('startup'), onMessage: event() },
            contextMenus: { onClicked: event(), removeAll: async () => {}, create() {} },
            action: { setPopup: async ({ popup }) => { popups.push(popup); } },
            storage: { local: {
                get: async (keys) => Object.fromEntries(keys.filter((k) => k in storage).map((k) => [k, storage[k]])),
                set: async (values) => { Object.assign(storage, values); }
            } }
        }
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/service-worker.js'), 'utf8'), context);
    context.offscreen = (operation, data) => {
        if (operation === 'migrate' && failMigrate-- > 0) return Promise.reject(new Error('offscreen unavailable'));
        return new Promise((resolve) => {
            offscreenListener({ target: 'offscreen', operation, ...data }, { id: 'ext' }, resolve);
        });
    };
    // Fire the real listeners, as Chrome does after an update or at browser start.
    const update = async (previousVersion) => {
        await listeners.installed({ reason: 'update', previousVersion });
        await context.configuring;
    };
    const startup = async () => {
        listeners.startup();
        await context.configuring;
    };
    return { context, localStorage, storage, popups, update, startup };
}

const v105 = {
    apiKey: 'old-key', apiSecret: 'old-secret', defaultGroup: 'Old group', defaultGroupId: '1',
    selectedDomainName: 'geni.us', createdLinks: '7', doneReview: 'true', installDate: '1/2/2020'
};
const v106 = {
    apiKey: 'new-key', apiSecret: 'new-secret', defaultGroup: 'New group', defaultGroupId: '2',
    selectedDomainName: 'example.link', doneReview: true, wrongKeys: false,
    groups: '["New group"]', groupsIds: '[2]'
};
// What 1.0.7 writes on its first run for a user with nothing in localStorage.
const v107Defaults = { createdLinks: '0', doneReview: 'false', selectedDomainName: 'geni.us', installDate: '10/7/2026' };

test('1.0.5 users without 1.0.6 settings keep their localStorage settings', async () => {
    const { localStorage, storage, popups, update } = setup({ local: v105 });
    await update('1.0.7');
    for (const [key, value] of Object.entries(v105)) assert.equal(localStorage.get(key), value);
    assert.equal(storage.legacySettingsMigrated, true);
    assert.deepEqual(popups, ['groups.html']);
});

test('updating straight from 1.0.6: fresh 1.0.6 installs get all settings copied', async () => {
    const { localStorage, popups, update } = setup({
        chromeStorage: { ...v106, createdLinks: '3', installDate: '05/06/2025' }
    });
    await update('1.0.6');
    assert.equal(localStorage.get('apiKey'), 'new-key');
    assert.equal(localStorage.get('apiSecret'), 'new-secret');
    assert.equal(localStorage.get('defaultGroupId'), '2');
    assert.equal(localStorage.get('selectedDomainName'), 'example.link');
    assert.equal(localStorage.get('createdLinks'), '3');
    assert.equal(localStorage.get('installDate'), '05/06/2025');
    assert.equal(localStorage.get('doneReview'), 'true');
    assert.equal(localStorage.get('wrongKeys'), 'false');
    assert.equal(localStorage.get('groupsIds'), '[2]');
    assert.deepEqual(popups, ['groups.html']);
});

test('updating straight from 1.0.6: 1.0.6 values replace stale 1.0.5 values; nulls are skipped', async () => {
    const { localStorage, update } = setup({ local: v105, chromeStorage: { ...v106, createdLinks: null } });
    await update('1.0.6');
    assert.equal(localStorage.get('apiKey'), 'new-key');
    assert.equal(localStorage.get('defaultGroup'), 'New group');
    assert.equal(localStorage.get('defaultGroupId'), '2');
    assert.equal(localStorage.get('createdLinks'), '7');
    assert.equal(localStorage.get('installDate'), '1/2/2020');
});

test('updating from 1.0.7: settings re-saved in 1.0.7 are kept and only gaps are filled', async () => {
    const saved = { ...v107Defaults, apiKey: 'new-key', apiSecret: 'new-secret', defaultGroup: 'Picked', defaultGroupId: '9' };
    const { localStorage, update } = setup({ local: saved, chromeStorage: v106 });
    await update('1.0.7');
    for (const [key, value] of Object.entries(saved)) assert.equal(localStorage.get(key), value);
    assert.equal(localStorage.get('groupsIds'), '[2]');
});

test('updating from 1.0.7: a partly entered key for another account is not mixed with 1.0.6 settings', async () => {
    const { localStorage, popups, update } = setup({
        local: { ...v107Defaults, apiKey: 'other-account-key' }, chromeStorage: { ...v106, lastCreatedLink: 'https://geni.us/x' }
    });
    await update('1.0.7');
    assert.equal(localStorage.get('apiKey'), 'other-account-key');
    for (const key of ['apiSecret', 'defaultGroup', 'defaultGroupId', 'groups', 'groupsIds', 'wrongKeys']) {
        assert.equal(localStorage.has(key), false, key);
    }
    assert.equal(localStorage.get('selectedDomainName'), 'geni.us');
    assert.equal(localStorage.get('lastCreatedLink'), 'https://geni.us/x');
    assert.deepEqual(popups, ['apikeys.html']);
});

test('updating from 1.0.7: a partly entered key for the same account is completed from 1.0.6', async () => {
    const { localStorage, popups, update } = setup({ local: { ...v107Defaults, apiKey: 'new-key' }, chromeStorage: v106 });
    await update('1.0.7');
    assert.equal(localStorage.get('apiSecret'), 'new-secret');
    assert.equal(localStorage.get('defaultGroupId'), '2');
    assert.deepEqual(popups, ['groups.html']);
});

test('updating from 1.0.7: stale 1.0.5 values are kept (accepted limitation)', async () => {
    const { localStorage, update } = setup({ local: v105, chromeStorage: v106 });
    await update('1.0.7');
    assert.equal(localStorage.get('apiKey'), 'old-key');
    assert.equal(localStorage.get('defaultGroupId'), '1');
});

test('updating from 1.0.7 without saved API keys: 1.0.6 values replace 1.0.7 defaults', async () => {
    const { localStorage, popups, update } = setup({ local: v107Defaults, chromeStorage: { ...v106, installDate: '05/06/2025' } });
    await update('1.0.7');
    assert.equal(localStorage.get('apiKey'), 'new-key');
    assert.equal(localStorage.get('defaultGroupId'), '2');
    assert.equal(localStorage.get('selectedDomainName'), 'example.link');
    assert.equal(localStorage.get('installDate'), '05/06/2025');
    assert.deepEqual(popups, ['groups.html']);
});

test('migration runs once and never overwrites settings saved afterwards', async () => {
    const { context, localStorage, update } = setup({ chromeStorage: v106 });
    await update('1.0.6');
    localStorage.set('defaultGroupId', '3');
    await context.configure();
    assert.equal(localStorage.get('defaultGroupId'), '3');
});

test('a failed migration does not block configuration and the retry keeps the 1.0.6 overwrite', async () => {
    const env = setup({ local: v105, chromeStorage: v106, failMigrate: 1 });
    await env.update('1.0.6');
    assert.deepEqual(env.popups, ['groups.html']);
    assert.equal(env.storage.legacySettingsMigrated, undefined);
    assert.equal(env.localStorage.get('apiKey'), 'old-key');

    // Later retries come from startup or a popup, which do not know the previous version.
    await env.context.configure();
    assert.equal(env.storage.legacySettingsMigrated, true);
    assert.equal(env.localStorage.get('apiKey'), 'new-key');
    assert.equal(env.localStorage.get('apiSecret'), 'new-secret');
    assert.equal(env.localStorage.get('defaultGroupId'), '2');
    assert.equal(env.localStorage.get('selectedDomainName'), 'example.link');
});

test('an update applied at browser start still overwrites when onStartup fires before onInstalled', async () => {
    const env = setup({ local: v105, chromeStorage: v106 });
    // onStartup alone must not decide the migration.
    await env.startup();
    assert.equal(env.storage.legacySettingsMigrated, undefined);
    assert.equal(env.localStorage.get('apiKey'), 'old-key');
    await env.update('1.0.6');
    assert.equal(env.storage.legacySettingsMigrated, true);
    assert.equal(env.localStorage.get('apiKey'), 'new-key');
    assert.equal(env.localStorage.get('defaultGroupId'), '2');
});

test('popups and startup never migrate before onInstalled has decided', async () => {
    const { context, localStorage, storage, startup } = setup({ local: v105, chromeStorage: v106 });
    await startup();
    await context.configure();
    assert.equal(storage.legacySettingsMigrated, undefined);
    assert.equal(storage.legacySettingsPending, undefined);
    assert.equal(localStorage.get('apiKey'), 'old-key');
});

test('a later update does not replace a pending 1.0.6 decision before the migration succeeds', async () => {
    const env = setup({ local: v105, chromeStorage: v106, failMigrate: 2 });
    await env.update('1.0.6');
    await env.update('1.0.8');
    assert.equal(env.storage.legacySettingsMigrated, undefined);
    await env.context.configure();
    assert.equal(env.storage.legacySettingsMigrated, true);
    assert.equal(env.localStorage.get('apiKey'), 'new-key');
});
