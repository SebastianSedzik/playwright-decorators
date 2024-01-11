---
"playwright-decorators": patch
---

`@test` and `@suite` decorators do no longer keep logic related to `fail`, `only`, `skip`, `slow`. Code was moved to dedicated decorators.
