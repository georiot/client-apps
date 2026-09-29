const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadGroups(groups, saved = {}) {
    const storage = { ...saved, setItem(key, value) { this[key] = String(value); } };
    const options = [];
    options.add = option => options.push(option);
    const list = { options, addEventListener() {} };
    let onLoad;
    const context = vm.createContext({
        localStorage: storage, testModel: {}, listOfGroups: list,
        document: {
            addEventListener(event, callback) { onLoad = callback; },
            getElementById() { return list; }, createElement() { return {}; }
        },
        $: () => ({ dialog() {}, text() {} }),
        chrome: { runtime: { sendMessage() {} } },
        GeniusLinkServiceClient: function () {
            this.getFromService = (url, args, success) => success({ Groups: groups });
        }
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/groups.js'), 'utf8'), context);
    onLoad();
    return { storage, list };
}

const groups = [
    { Id: 3, Name: 'Zulu', Enabled: 1 },
    { Id: 2, Name: 'alpha', Enabled: '1' },
    { Id: 1, Name: 'Default', Enabled: 1 }
];

test('prefer default over API order and alphabetical order without a saved choice', () => {
    const { storage, list } = loadGroups(groups);
    assert.equal(storage.defaultGroupId, '1');
    assert.equal(storage.defaultGroup, 'Default');
    assert.equal(list.value, '1');
    assert.deepEqual(list.options.map(option => option.text), ['alpha', 'Default', 'Zulu']);
});

test('use the first enabled group alphabetically when default is absent', () => {
    const { storage, list } = loadGroups(groups.filter(group => group.Id !== 1));
    assert.equal(storage.defaultGroupId, '2');
    assert.equal(list.value, '2');
});

test('preserve saved group ID, including after the group is renamed', () => {
    const { storage, list } = loadGroups(groups, { defaultGroupId: '3', defaultGroup: 'Previous name' });
    assert.equal(storage.defaultGroupId, '3');
    assert.equal(storage.defaultGroup, 'Zulu');
    assert.equal(list.value, '3');
});

test('preserve a saved choice when no default group exists', () => {
    const { storage } = loadGroups(groups.filter(group => group.Id !== 1), { defaultGroupId: '3' });
    assert.equal(storage.defaultGroupId, '3');
});

test('honor legacy name-only settings and persist the corresponding ID', () => {
    const { storage } = loadGroups(groups, { defaultGroup: 'Zulu' });
    assert.equal(storage.defaultGroupId, '3');
});

test('treat empty preferences as unset and recover from deleted selections', () => {
    assert.equal(loadGroups(groups, { defaultGroupId: '', defaultGroup: '' }).storage.defaultGroupId, '1');
    assert.equal(loadGroups(groups, { defaultGroupId: 'missing' }).storage.defaultGroupId, '1');
});

test('never select a disabled default or disabled saved group', () => {
    const disabled = groups.map(group => ({ ...group, Enabled: group.Id === 2 ? 1 : 0 }));
    const { storage, list } = loadGroups(disabled, { defaultGroupId: '3' });
    assert.equal(storage.defaultGroupId, '2');
    assert.equal(list.options.length, 1);
});

test('an empty enabled list does not overwrite saved preferences', () => {
    for (const unavailable of [[], groups.map(group => ({ ...group, Enabled: 0 }))]) {
        const { storage, list } = loadGroups(unavailable, { defaultGroupId: '3', defaultGroup: 'Zulu' });
        assert.equal(storage.defaultGroupId, '3');
        assert.equal(storage.defaultGroup, 'Zulu');
        assert.equal(list.disabled, true);
        assert.equal(list.options.length, 0);
    }
});
