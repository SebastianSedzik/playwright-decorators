# playwright-decorators

Decorators for writing Playwright based tests.

## Example
```ts
import { suite, test } from 'playwright-decorators';

@suite
class UserSettingsTestSuite {
  @test
  shouldBeAbleToChangeName() {
    // ...
  }
}
```
