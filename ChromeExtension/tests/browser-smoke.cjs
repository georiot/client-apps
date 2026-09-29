// Playwright + Chromium required. All API responses are fake; no real links are created.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

(async () => {
    const extension = path.resolve(__dirname, '..');
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'geniuslink-mv3-'));
    const context = await chromium.launchPersistentContext(profile, {
        executablePath: process.env.CHROMIUM_PATH,
        channel: 'chromium', headless: true,
        args: ['--disable-extensions-except=' + extension, '--load-extension=' + extension]
    });
    try {
        const errors = [];
        context.on('weberror', error => errors.push(error.error().message));
        await context.route('https://api.geni.us/**', async route => {
            const url = route.request().url();
            let body;
            if (url.includes('/groups/list')) body = '{Groups:[{Name:Default,Id:1,Enabled:1},{Name:Other,Id:2,Enabled:1}]}';
            else if (url.includes('/custom-domains/domains')) body = '{Domains:[{Name:geni.us},{Name:links.example.com}]}';
            else if (url.includes('/links/list')) body = '{Results:[{Domain:geni.us,ShortUrlCode:example,TotalClicks:3}]}';
            else throw new Error('Unexpected API request: ' + new URL(url).pathname);
            await route.fulfill({ contentType: 'text/plain', body });
        });
        const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
        const base = worker.url().split('/js/')[0];
        const page = await context.newPage();
        await page.goto(base + '/apikeys.html');
        await worker.evaluate(() => configure());
        assert.equal(await worker.evaluate(() => chrome.action.getPopup({})), base + '/apikeys.html');
        await page.locator('#apiKey').fill('test-key');
        await page.locator('#apiSecret').fill('test-secret');
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        await page.waitForURL('**/groups.html');
        await page.locator('#listOfGroups option[value="1"]').waitFor({ state: 'attached' });
        await page.locator('#listOfGroups').selectOption('2');
        assert.equal(await page.evaluate(() => localStorage.defaultGroupId), '2');
        await page.goto(base + '/customDomain.html');
        await page.locator('select option').first().waitFor({ state: 'attached' });
        await page.locator('select').selectOption({ label: 'links.example.com' });
        assert.equal(await page.evaluate(() => localStorage.selectedDomainName), 'links.example.com');
        await page.goto(base + '/lastlinks.html');
        await page.getByText('https://geni.us/example', { exact: true }).waitFor();
        assert.equal(await page.locator('tbody tr').count(), 1);
        // Exercise the real worker/offscreen bridge with a fake v3 response.
        const result = await worker.evaluate(async () => {
            const originalFetch = globalThis.fetch;
            globalThis.fetch = async (url, options) => {
                const body = JSON.parse(options.body);
                if (url !== 'https://api.geni.us/v3/shorturls' || options.method !== 'POST' ||
                    options.headers['X-Api-Key'] !== 'test-key' || options.headers['X-Api-Secret'] !== 'test-secret' ||
                    options.headers['Content-Type'] !== 'application/json' || options.headers.Accept !== 'application/json' ||
                    body.groupId !== 2 || body.domain !== 'links.example.com' || body.url !== 'https://example.com/product' ||
                    'apiKey' in body || 'apiSecret' in body) throw new Error('Incorrect creation request');
                return Response.json({ shortUrl: { domain: 'geni.us', code: 'test-created' } });
            };
            try { return await createLink('https://example.com/product', undefined, false); }
            finally { globalThis.fetch = originalFetch; }
        });
        assert.equal(result.url, 'https://geni.us/test-created');
        assert.equal(result.copied, true);
        assert.equal(await page.evaluate(() => localStorage.lastCreatedLink), result.url);
        await worker.evaluate(() => configure());
        assert.equal(await worker.evaluate(() => chrome.action.getPopup({})), base + '/groups.html');
        const settings = await worker.evaluate(async () => (await offscreen('settings')).settings);
        assert.equal(settings.defaultGroupId, '2');
        assert.equal(settings.apiKey, 'test-key');
        assert.equal(settings.createdLinks, '1');
        await page.goto(base + '/groupsReview.html');
        await page.locator('[data-bind-key="thumbsup"]').waitFor();
        await page.goto(base + '/alertDoneOutside.html#' + new URLSearchParams({ url: result.url, copied: 'false' }));
        assert.equal(await page.locator('#lastCreatedLink').textContent(), result.url);
        assert.match(await page.locator('.successText').textContent(), /Automatic copy failed/);
        // Settings must survive the offscreen document being destroyed and recreated.
        await worker.evaluate(() => chrome.offscreen.closeDocument());
        assert.equal(await worker.evaluate(async () => (await offscreen('settings')).settings.apiKey), 'test-key');
        assert.deepEqual(errors, []);
        console.log('PASS: Chromium loaded MV3; popup bindings, settings, groups, domains, recent links, API request, offscreen clipboard, and review/result pages.');
    } finally {
        await context.close();
        // Keep the temporary profile available for diagnosing a failed run.
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
