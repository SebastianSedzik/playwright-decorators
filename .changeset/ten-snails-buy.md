---
"playwright-decorators": minor
---

Add `@retry` decorator

Set the maximum number of retry attempts given to failed `@tests` in the `@suite`

```ts
import { suite, test, retry } from 'playwright-decorators';

@retry(3) // <-- Decorate suite with @retry()
@suite()
class MyTestSuite {
    @test()
    async test() { // <- This test may be retried up to 3 times if it fails
        // ...
    }
}
```
