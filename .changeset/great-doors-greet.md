---
'playwright-decorators': patch
---

Fix export of `TestInfo` type

```ts
import { suite, test, TestArgs, TestInfo } from '@playwright/test'

@suite()
class TestSuite {
    @test()
    myTest({ page }: TestArgs, testInfo: TestInfo) {
      // ...
    }
}

```
