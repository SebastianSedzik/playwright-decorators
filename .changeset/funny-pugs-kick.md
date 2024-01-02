---
'playwright-decorators': patch
---

Fixes of `@skip` and `@annotate` decorators:

- Pass `reason` from `@skip` decorator to the reporter.
- Added support for annotations on skipped tests.
