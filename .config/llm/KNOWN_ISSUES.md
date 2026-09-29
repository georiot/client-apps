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
