#Geniuslink Chrome Extension

Create and share links even faster, without even logging into the dashboard. With this extension, you can just right-click any link and choose "Create geni.us link"

##Installation
1. Install the [Geniuslink Chrome Extension](https://chrome.google.com/webstore/detail/geniuslink-intelligent-li/fgoilnlnleemcedbmhoalpmhkefdppbm)
1. Once installed, click the "g" extension icon in the upper right of your browser.
1. Fill in the API Key and Api Secret fields for your account. You can find your keys [here](https://my.geniuslink.com/tools)
1. Select the group where you want your links to live, or leave it on "default".

**That's it!** Once installed, you can simply right-click any link in your browser window, and select "Create geni.us link." It will be added to the links in your dashboard automatically.


## For Developers

### Load this checkout in Chrome

This folder uses Manifest V3 and requires Chrome 116 or newer.

1. Open `chrome://extensions` and enable **Developer mode**.
2. Click **Load unpacked** and select `ChromeExtension`, the folder containing `manifest.json`.
3. If already installed, click **Reload** after changing files.
4. Open the extension icon, enter your Geniuslink API credentials, and select a group. Refresh existing website tabs before testing right-click notifications.

For more information, refer to the Confluence doc: [Load and Test the Geniuslink Chrome Extension locally](https://geniuslink.atlassian.net/wiki/spaces/Engineering/pages/560234542/Load+and+Test+the+Geniuslink+Chrome+Extension+locally).

The service worker handles context menus and link creation. An offscreen document
reads the existing popup localStorage settings and performs clipboard copying.
Explicit bindings in `js/bindings.js` avoid script evaluation disallowed by MV3.
Link creation uses the v3 JSON API with `X-Api-Key` and `X-Api-Secret` headers and
reports API error details with credentials redacted.

### Regression tests

Run `npm test` in this folder with Node.js 20 or newer. These dependency-free tests
cover the v3 request/response contract, API errors, credential redaction, unexpected
responses, and restricted browser URLs.

For the browser smoke test, install Playwright with `npm install --no-save playwright`
and `npx playwright install chromium`, then run `npm run test:mv3`. Optionally set
`CHROMIUM_PATH` to a Chromium executable. The test uses a temporary browser profile
and fake API responses to exercise installation, popup bindings, settings, groups,
domains, recent links, link creation, and clipboard copying. It does not validate
real Geniuslink credentials or create real links.

### Packaging for the Chrome Web Store

The [Package Chrome Extension](../.github/workflows/package-chrome-extension.yml)
GitHub Action builds the versioned upload zip and tags the release. To release:

1. In your PR, raise `version` in `manifest.json` above the version on the
   Chrome Web Store listing.
2. Merge the PR to `master`. The workflow builds
   `geniuslink-chrome-extension-v<version>.zip` and pushes the
   `chrome-v<version>` tag on the merge commit.
3. Download the zip from the workflow run's artifacts and upload it to the Chrome
   Web Store Developer Dashboard manually.

`manifest.json` is the source of truth for the version. The workflow runs on
`master` when `manifest.json` changes and releases only when `version` differs
from the previous commit; other manifest edits never release or tag. It fails
without tagging if the version is not a valid Chrome version or is not greater
than every existing `chrome-v*` tag. It does not check the Chrome Web Store, so
always release through `master`; an upload built from another branch leaves the
repo unaware of the published version.

If a release run fails, fix the cause and use **Re-run jobs** on that run; it
compares the same commits, so it releases the same version. The workflow never
creates tags for versions released earlier; create a missing tag by hand on the
commit that was published.

Running the workflow manually via the **Run workflow** button on the Actions tab
builds a zip of the selected branch without tagging; use this for test builds,
not for Web Store uploads.

## Unit Testing
The project is set to use the jasmine framework : http://jasmine.github.io/2.5/introduction.html

This is a BDD(Behavioural Driven) framework it works by writing specs additionally it includes a mocking framework in it.

All test should be in the geniuslink_js_tests. 

This project follows the Airbnb styled guidelines. If you are making a commit please use the Airbnb ES5 guideline. https://github.com/airbnb/javascript/tree/es5-deprecated/es5
