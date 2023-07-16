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
Mark class method as test by decorating it with `@test()` or `@test(options)` decorator.
Under the hood, decorator creates a `test` block and runs the method inside it.

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

### Run method before all test in the suite: `@beforeAll()`
Mark method as `beforeAll` book.

```ts
import { suite, test, beforeAll } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @beforeAll() // <-- Decorate method with @beforeAll()
  async beforeAll({page}) {
    // ...
  }
}
```

### Run method before each test in the suite: `@beforeEach()`
Mark method as `beforeEach` book.

```ts
import { suite, test, beforeEach } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @beforeEach() // <-- Decorate method with @beforeEach()
  async beforeEach({ page }) {
    // ...
  }
}
```

### Run method after all test in the suite: `@afterAll()`
Mark method as `afterAll` book.

```ts
import { suite, test, afterAll } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @afterAll() // <-- Decorate method with @afterAll()
  async afterAll({page}) {
    // ...
  }
}
```

### Run method after each test in the suite: `@afterEach()`
Mark method as `afterEach` book.

```ts
import { suite, test, afterEach } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @afterEach() // <-- Decorate method with @afterEach()
  async afterEach({ page }) {
    // ...
  }
}
```

### Skip test or suite: `@skip(reason?: string)`
Skip single method or test suite.

```ts
import { suite, test, skip } from 'playwright-decorators';

// Skip test suite
@skip() // <-- Decorate suite with @skip()
@suite()
class SkippedTestSuite {
}

// Or skip selected test
@suite()
class MyTestSuite {
  @skip() // <-- Decorate test with @skip()
  @test()
  async skippedTest({ page }) {
    // ...
  }
}
```

#### Options
- `reason` (optional) - reason of skipping. Will be displayed in the test report.

### Mark test or suite as "slow": `@slow(reason?: string)`
Mark single method or test suite as "slow".
Slow test will be given triple the default timeout.

```ts
import { suite, test, skip } from 'playwright-decorators';

// Mark test suite as "slow"
@slow() // <-- Decorate suite with @slow()
@suite()
class SlowTestSuite {
}

// Or mark selected test as "slow"
@suite()
class MyTestSuite {
  @slow() // <-- Decorate test with @slow()
  @test()
  async slowTest({ page }) {
    // ...
  }
}
```

#### Options
- `reason` (optional) - reason of marking as "slow". Will be displayed in the test report.

### Run only selected test(s) or suite(s): `@only()`
Declares a focused test or suite.
If there are some focused tests or suites, all of them will be run but nothing else.

```ts
import { suite, test, only } from 'playwright-decorators';

// Run only selected test suite(s)
@only() // <-- Decorate suite with @only()
@suite()
class FocusedTestSuite {
}

// Or run only selected test(s)
@suite()
class TestSuite {
    @only() // <-- Decorate test with @only()
    @test()
    async focusedTest({ page }) {
        // ...
    }
}
```
