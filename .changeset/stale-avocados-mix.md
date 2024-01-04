---
'playwright-decorators': minor
---

Add `@preview` decorator

Runs a `@test`(s) or `@suite`(s) in preview (headed browser) mode, simulating user interaction (slowing down each operation by 1000ms).
Tests or suites without the `@preview` decorator will not be excluded.

```ts
import { suite, test, preview, TestArgs } from 'playwright-decorators';

// Preview selected test suite(s)
@preview() // <-- Decorate suite with @preview()
@suite()
class PreviewTestSuite {
}

// Or preview selected test(s)
@suite()
class TestSuite {
    @preview() // <-- Decorate test with @preview()
    @test()
    async test({ page }: TestArgs) {
        // ...
    }
}
```
