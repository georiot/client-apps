const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(response) {
    const requests = [];
    const saved = [];
    const settings = { apiKey: ' test-key ', apiSecret: ' test-secret ', defaultGroupId: '42', selectedDomainName: 'geni.us' };
    const event = () => ({ addListener() {} });
    const context = vm.createContext({
        URL, AbortSignal, console,
        fetch: async (url, options) => { requests.push({ url, options }); return response; },
        chrome: {
            runtime: { onInstalled: event(), onStartup: event(), onMessage: event() },
            contextMenus: { onClicked: event() },
            action: { setBadgeText: async () => {}, setTitle: async () => {} }
        }
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/service-worker.js'), 'utf8'), context);
    context.offscreen = async (operation, data) => {
        if (operation === 'settings') return { settings };
        saved.push(data.url);
        return { copied: true };
    };
    return { context, requests, saved };
}

test('v3 request uses auth headers and JSON; camelCase response creates an HTTPS link', async () => {
    const { context, requests, saved } = setup(Response.json({ shortUrl: { domain: 'geni.us', code: 'abc' } }));
    const url = 'https://example.com/product?q=a&b=2';
    const result = await context.createLink(url, undefined, false);
    assert.equal(result.url, 'https://geni.us/abc');
    assert.equal(result.copied, true);
    assert.deepEqual(saved, ['https://geni.us/abc']);
    assert.equal(requests.length, 1);
    const request = requests[0];
    assert.equal(request.url, 'https://api.geni.us/v3/shorturls');
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.headers['X-Api-Key'], 'test-key');
    assert.equal(request.options.headers['X-Api-Secret'], 'test-secret');
    assert.equal(request.options.headers['Content-Type'], 'application/json');
    assert.equal(request.options.headers.Accept, 'application/json');
    assert.deepEqual(JSON.parse(request.options.body), { groupId: 42, domain: 'geni.us', url });
});

test('API errors include status and detail, redact credentials, and never save a link', async () => {
    const { context, saved } = setup(Response.json({ responseStatus: {
        errorCode: 'InvalidArgument', message: 'Domain not authorized: test-secret'
    } }, { status: 400 }));
    await assert.rejects(context.createLink('https://example.com', undefined, false),
        /^Error: Geniuslink API \(HTTP 400\): Domain not authorized: \[redacted\]$/);
    assert.deepEqual(saved, []);
});

test('non-JSON gateway errors preserve the HTTP status', async () => {
    const { context } = setup(new Response('<html>Bad gateway</html>', { status: 502 }));
    await assert.rejects(context.createLink('https://example.com', undefined, false), /HTTP 502/);
});

test('unexpected success response warns against accidentally creating duplicates', async () => {
    const { context, saved } = setup(Response.json({}));
    await assert.rejects(context.createLink('https://example.com', undefined, false), /Check your dashboard before retrying/);
    assert.deepEqual(saved, []);
});

test('restricted browser URLs never reach the API', async () => {
    const { context, requests } = setup(Response.json({}));
    await assert.rejects(context.createLink('chrome://extensions', undefined, false), /regular web page/);
    assert.deepEqual(requests, []);
});
