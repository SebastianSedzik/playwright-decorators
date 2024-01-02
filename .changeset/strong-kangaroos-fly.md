---
'playwright-decorators': minor
---

Improved TypeScript support:
- Restricted the Suite decorator to class contexts only.
- Ensured that the Test decorator is exclusively applicable to test methods, with a thorough check on method arguments.
- Exported the TestArgs type to maintain typing validity and accuracy within test scenarios.
