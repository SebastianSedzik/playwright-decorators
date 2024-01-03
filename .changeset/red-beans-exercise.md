---
'playwright-decorators': minor
---

Added support for creating custom test and suite decorator

```ts
import { createSuiteAndTestDecorator } from 'playwright-decorators'
import playwright from '@playwright/test'

const mySuiteAndTestDecorator = createSuiteAndTestDecorator(
  'mySuiteAndTestDecorator',
  ({suite}) => {
    suite.initialized(() => {
      /** run custom code when suite is initialized **/
    })
  },
  ({test}) => {
    test.beforeTest(() => {
      /** run custom code before test execution **/
    })
    test.afterTest(() => {
      /** run custom code after test execution **/
    })
    
    playwright.beforeEach(() => {
        /** run custom code before each test execution **/
    })
  }
);
```
