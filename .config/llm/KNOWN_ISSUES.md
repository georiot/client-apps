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

- **Symptom:** A `manifest.json` version at or below the published version is released by
  the packaging workflow, but the Chrome Web Store rejects the zip with "Invalid version number
  in manifest".
- **Cause:** The "Resolve version" step in `.github/workflows/package-chrome-extension.yml`
  compares the version only against existing `chrome-v*` git tags; it does not query the Web Store.
  Version `1.0.6` was uploaded manually from the `manifest-v3` branch, and `1.0.7` was published
  without a `chrome-v1.0.7` tag (GL-2448), so no `chrome-v*` tags existed before the workflow
  started tagging releases (GL-2620).
- **Workaround:** Check the version on the Web Store listing and set a higher one.
  Tagging `origin/manifest-v3` as `chrome-v1.0.6` was considered and intentionally skipped.
- **Deferred fix:** None needed. Remove this entry once any `chrome-v*` tag at or above the
  published version exists; the workflow creates one on the next release.
- **Validation:** Run `git ls-remote --tags origin 'chrome-v*'` and confirm a tag at or above
  the published version is listed.
