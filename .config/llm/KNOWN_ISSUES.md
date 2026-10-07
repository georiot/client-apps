---
coverage: Repo-wide and cross-cutting known issues and workarounds
---

# Known Issues

## Preserve valid credentials after temporary group-loading failures

- **Symptom:** Check this issue when a configured user's popup opens on the API-keys page
  after a group-loading failure and browser restart.
- **Cause:** Trace the broad `wrongKeys = true` assignment in `ChromeExtension/js/groups.js`;
  the V3 `js/service-worker.js` newly uses that pre-existing flag to select the startup popup.
- **Workaround:** Re-save existing credentials after service recovers; a successful group load clears the flag.
- **Deferred fix (low priority):** Set `wrongKeys` only for confirmed authentication failures;
  handle empty or malformed error responses safely. Address this in a future ticket.
- **Validation:** Test temporary failures, authentication failures, startup popup selection, and recovery.

## Do not rely on v1 edit-link fragments to open the dashboard v2 editor

Treat `/links#!editlink=<shorturl-code>` as a broken editor deep link in dashboard v2:
it opens `/links` without opening the corresponding editor, although it works in dashboard v1.
Check `ChromeExtension/js/lastLinksViewModel.js` and `ChromeExtension/js/utilities.js`,
which still append this legacy fragment to `https://my.geniuslink.com`.
Open the matching link's editor manually from the links page until a fix is available.
Confirm dashboard v2's supported editor route before replacing the fragment; verify the target editor opens.

## Release version check has no baseline until the first tagged Chrome release

- **Symptom:** A `chrome-v*` tag at or below the published version passes the packaging
  workflow, but the Chrome Web Store rejects the zip with "Invalid version number in manifest".
- **Cause:** The "Resolve version" step in `.github/workflows/package-chrome-extension.yml`
  compares the tag only against existing `chrome-v*` git tags; it does not query the Web Store.
  Version `1.0.6` was uploaded manually from the `manifest-v3` branch, and `1.0.7` was published
  without pushing a `chrome-v1.0.7` tag (GL-2448), so no `chrome-v*` tags exist yet.
- **Workaround:** Check the version on the Web Store listing and release a higher one.
  Tagging `origin/manifest-v3` as `chrome-v1.0.6` was considered and intentionally skipped.
- **Deferred fix:** None needed. Remove this entry once any `chrome-v*` tag at or above the
  published version exists; that tag becomes the baseline for the check.
- **Validation:** Run `git ls-remote --tags origin 'chrome-v*'` and confirm a tag at or above
  the published version is listed.

## Users updated to 1.0.7 may still use stale 1.0.5 settings

- **Symptom:** After updating, a user who changed API keys, group, or domain in 1.0.6 creates
  links with the credentials, group, or domain they had saved in 1.0.5 or earlier.
- **Cause:** 1.0.6 stored settings in `chrome.storage.local`; 1.0.7 reads only `localStorage`
  and shipped without a migration (GL-2619). `migrateLegacySettings` in
  `ChromeExtension/js/service-worker.js` and the `migrate` operation in
  `ChromeExtension/js/offscreen.js` cannot tell stale 1.0.5 values from values re-saved in 1.0.7,
  so for users already on 1.0.7 they keep existing values and only fill missing ones.
- **Workaround:** Re-save API keys, group, and domain in the extension popup.
- **Deferred fix:** None planned. Overwriting would revert settings users changed in 1.0.7.
- **Validation:** Covered by `ChromeExtension/tests/migration.test.cjs`; run `npm test` in
  `ChromeExtension`.
