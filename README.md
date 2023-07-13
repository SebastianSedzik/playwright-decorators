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
### Creating a test suite: `@suite(options?)`
Decorate a class with `@suite()` or `@suite(options)` to create a test suite.
Under the hood, decorator creates a `describe` block and runs all methods decorated by `@test` inside it.

```ts
import { suite } from 'playwright-decorators';

@suite() // <-- Decorate class with @suite() or @suite(options)
class MyTestSuite {
  // ...
}
```

#### Options
- `name` (optional) - name of the test suite. By default, name of the class.

### Creating a test: `@test(options?)`
You can create a test by decorating a method with `@test()` or `@test(options)` decorator.

```ts
import { suite, test } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @test() // <-- Decorate test method with @test() or @test(options)
  async myTest({ page }) {
    // ...
  }
}
```

#### Options
- `name` (optional) - name of the test. By default, name of the method.
