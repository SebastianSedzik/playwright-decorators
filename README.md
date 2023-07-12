# playwright-decorators

TypeScript's decorators for writing Playwright based tests.

> **Warning**: This package is in early development stage. Use it at your own risk.

## 🌱 Installation
```sh
npm i playwright-decorators
```

## 🏗️ Usage
Declare tests using `@suite` and `@test` decorators
```ts
import { suite, test } from 'playwright-decorators';

@suite()  // <-- Decorate class with @suite
class MyTestSuite {
  @test()  // <-- Decorate test method with @test
  async myTest({ page }) {
    // ...
  }
}
```

## 📝 Documentation
### `@suite()`, `@suite(options)` => `describe()`
Mark class as a test suite.
Runs all class methods decorated by `@test` inside `options.name` context (`describe(options.name, all_methods_decorated_by_@test`).

#### Options
- `name` (optional) - name of the test suite. By default, name of the class.

### `@test()`, `@test(options)` => `test()`
Mark method as a test. Run method using `test(option.name, method)`.

#### Options
- `name` (optional) - name of the test. By default, name of the method.
