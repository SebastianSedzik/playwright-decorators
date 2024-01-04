---
'playwright-decorators': minor
---

Add `@debug` decorator

Runs a `@test`(s) or `@suite`(s) in debug mode.
Tests or suites without the `@debug` decorator will not be excluded.
Learn more about debug mode: https://playwright.dev/docs/debug

```ts
import { suite, test, debug, TestArgs } from 'playwright-decorators';

// Debug selected test suite(s)
@debug() // <-- Decorate suite with @debug()
@suite()
class DebugTestSuite {
}

// Or debug selected test(s)
@suite()
class TestSuite {
    @debug() // <-- Decorate test with @debug()
    @test()
    async test({ page }: TestArgs) {
        // ...
    }
}
```
