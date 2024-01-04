# playwright-decorators

TypeScript's decorators for writing Playwright based tests.

[![npm version](https://badge.fury.io/js/playwright-decorators.svg)](https://www.npmjs.com/package/playwright-decorators)
[![package tests](https://github.com/SebastianSedzik/playwright-decorators/actions/workflows/master.yml/badge.svg?branch=master)](https://github.com/SebastianSedzik/playwright-decorators/actions/workflows/master.yml)

## 🌱 Installation
```sh
npm i playwright-decorators
```

## 🏗️ Usage
Declare tests using `@suite` and `@test` decorators
```ts
import { suite, test, slow, tag, TestArgs, TestInfo } from 'playwright-decorators';

@suite()  // <-- Decorate class with @suite
class MyTestSuite {
  @test() // <-- Decorate test method with @test
  async myTest({ page }: TestArgs, testInfo: TestInfo) {
    // ...
  }

  @tag(['team-x'])
  @slow('Response from pasword reset service takes a long time')
  @test() 
  async userShouldBeAbleToResetPassword({ page }: TestArgs) {
    // ...
  }

  @withUser({ features: ['payment'] }) // <- Use your own custom decorators
  @test()
  async userShouldBeAbleToCancelSubscription({ page }: TestArgs) {
    // ...
  }
}
```
To view all the available decorators, check the [documentation](#-documentation) section.
For guidance on creating custom decorators, refer to the [custom decorators](#custom-decorators) section.
Explore additional examples in the [examples](./examples) directory.

## 📝 Documentation
### Creating a test suite: `@suite(options?)`
Mark class as test suite.
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
Mark class method as test.
Under the hood, decorator creates a `test` block and runs the method inside it.

```ts
import { suite, test, TestArgs } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @test() // <-- Decorate test method with @test() or @test(options)
  async myTest({ page }: TestArgs) {
    // ...
  }
}
```

#### Options
- `name` (optional) - name of the test. By default, name of the method.


### Run method before all test in the suite: `@beforeAll()`
Mark method as `beforeAll` book.

```ts
import { suite, test, beforeAll, TestArgs } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @beforeAll() // <-- Decorate method with @beforeAll()
  async beforeAll({ page }: TestArgs) {
    // ...
  }
}
```


### Run method before each test in the suite: `@beforeEach()`
Mark method as `beforeEach` book.

```ts
import { suite, test, beforeEach, TestArgs } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @beforeEach() // <-- Decorate method with @beforeEach()
  async beforeEach({ page }: TestArgs) {
    // ...
  }
}
```


### Run method after all test in the suite: `@afterAll()`
Mark method as `afterAll` book.

```ts
import { suite, test, afterAll, TestArgs } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @afterAll() // <-- Decorate method with @afterAll()
  async afterAll({ page }: TestArgs) {
    // ...
  }
}
```


### Run method after each test in the suite: `@afterEach()`
Mark method as `afterEach` book.

```ts
import { suite, test, afterEach, TestArgs } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @afterEach() // <-- Decorate method with @afterEach()
  async afterEach({ page }: TestArgs) {
    // ...
  }
}
```


### Skip test or suite: `@skip(reason?: string)`
Skip single `@test` or `@suite`.

```ts
import { suite, test, skip, TestArgs } from 'playwright-decorators';

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
  async skippedTest({ page }: TestArgs) {
    // ...
  }
}
```

#### Options
- `reason` (optional) - reason of skipping. Will be displayed in the test report.


### Mark test or suite as "should fail": `@fail(reason?: string)`
Mark single `@test` or `@suite` as "should fail".
Playwright Test runs this test and ensures that it is actually failing.
This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed.

```ts
import { suite, test, fail, TestArgs } from 'playwright-decorators';

// Mark suite as "fail", ensure that all tests from suite fail
@fail() // <-- Decorate suite with @fail()
@suite()
class FailTestSuite {
}

// Or mark selected test as "fail"
@suite()
class MyTestSuite {
  @fail() // <-- Decorate test with @fail()
  @test()
  async failingTest({ page }: TestArgs) {
    // ...
  }
}
```

#### Options
- `reason` (optional) - reason of marking as "should fail". Will be displayed in the test report.


### Mark test or suite as "fixme", with the intention to fix it: `@fixme(reason?: string)`
Marks a `@test` or `@suite` as "fixme", with the intention to fix (with optional reason).
Decorated tests or suites will not be run.

```ts
import { suite, test, fixme, TestArgs } from 'playwright-decorators';

// Mark test suite as "fixme"
@fixme() // <-- Decorate suite with @fixme()
@suite()
class FixmeTestSuite {
}

// Or mark selected test as "fixme"
@suite()
class MyTestSuite {
  @fixme() // <-- Decorate test with @fixme()
  @test()
  async fixmeTest({ page }: TestArgs) {
    // ...
  }
}
```

#### Options
- `reason` (optional) - reason of marking as "fixme". Will be displayed in the test report.


### Mark test or suite as "slow": `@slow(reason?: string)`
Mark single `@test` or `@suite` as "slow".
Slow test will be given triple the default timeout.

```ts
import { suite, test, skip, TestArgs } from 'playwright-decorators';

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
  async slowTest({ page }: TestArgs) {
    // ...
  }
}
```

#### Options
- `reason` (optional) - reason of marking as "slow". Will be displayed in the test report.


### Run only selected test(s) or suite(s): `@only()`
Declares a focused `@test` or `@suite`.
If there are some focused tests or suites, all of them will be run but nothing else.

```ts
import { suite, test, only, TestArgs } from 'playwright-decorators';

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
    async focusedTest({ page }: TestArgs) {
        // ...
    }
}
```


### Run test(s) or suite(s) with certain tag(s): `@tag(tags: string[])`
Adds tags to `@test` or `@suite`.
You can later run test(s) or suite(s) with specific tag, using `npx playwright test --grep "@nameOfTag"` command.
For example: to run tests/suites with `x` tag, please run `npx playwright test --grep "@x"`

```ts
import { suite, test, tag, TestArgs } from 'playwright-decorators';

// Run only selected test suite(s)
@tag(['x-api-consumer']) // <-- Decorate suite with @tag()
@suite()
class ApiConsumerTestSuite {
}

// Or run only selected test(s)
@suite()
class TestSuite {
    @tag(['x-api-consumer']) // <-- Decorate test with @tag()
    @test()
    async apiConsumerTest({ page }: TestArgs) {
        // ...
    }
}
```

To run test(s) or suite(s) for `x-api-consumer` tag (example above), please type and run below command:
```shell
npx playwright test --grep "@x-api-consumer"
``` 

#### Options
- `tags` (required) - array of tags. (Tags should not be prefixed with `@` sign, as sign will be automatically added to every tag by `@tag` decorator).


### Add custom annotation to test(s): `@annotate({type: string, description?: string})`
Add custom annotation to a test.
Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.

```ts
import { suite, test, annotation, TestArgs } from 'playwright-decorators';

@suite()
class MyTestSuite {
  @annotation({ type: 'issue', description: 'https://github.com/microsoft/playwright/issues/<some-issue>' }) // <-- Decorate test with @annotate()
  @test()
  async testWithCustomAnnotation({ page }: TestArgs) {
    // ...
  }
}
```

#### Options
- `type` (required) - type of annotation, for example 'skip' or 'fail'.
- `description` (optional) - description of annotation.


### Run test(s) or suite(s) in debug mode: `@debug()`
Runs a `@test`(s) or `@suite`(s) in debug mode.
`@test`(s) or `@suite`(s) lacking the `@debug` decorator will be excluded.
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

Then run playwright tests as usual, i.e `npx playwright test`.
> For debugging purposes, it is recommended to run tests only for one project / browser.

### Custom decorators
Custom decorators can be created using `createTestDecorator` and `createSuiteDecorator` functions.
Simple usage examples are provided below. For more advanced examples, please refer to [example decorators](./examples/tests/decorators) directory.

#### Test decorator
The `createTestDecorator` function enables the generation of custom test decorators.
Attempting to utilize a custom test decorator on a method that lacks the `@test` decoration will result in an error.

```ts
import { suite, createTestDecorator } from 'playwright-decorators';
import playwright from '@playwright/test';

const customTestDecorator = createTestDecorator('customTestDecorator', ({ test }) => {
  // create code using hooks provided by test decorator...
  test.beforeTest(() => { /* ... */ })
  test.afterTest(() => { /* ... */ })

  // ...or Playwright hooks
  playwright.beforeEach(() => {
    // ...
  })
});
```

Then use it on `@test` decorator:
```ts
@suite()
class MyTestSuite {
  @customTestDecorator() // <-- Decorate test with custom decorator
  @test()
  async myTest({ page }: TestArgs) {
    // ...
  }
}
```

#### Suite decorator
The `createSuiteDecorator` function allows the creation of custom suite decorators.
Attempting to apply a custom suite decorator to a class that lacks the `@suite` decoration will result in an error.

```ts
import { suite, createSuiteDecorator } from 'playwright-decorators';

const customSuiteDecorator = createSuiteDecorator('customSuiteDecorator', ({ suite }) => {
  // run your custom code imadiately
  suite.name = 'Custom name';

  // or attach to specific hooks...
  suite.initialized(() => { /* ... */ })
});
```

Then use it on `@suite` decorator:
```ts
@customSuiteDecorator() // <-- Decorate suite with custom decorator
@suite()
class MyTestSuite {
  // ...
}
```

### Suite and test decorator
The `createSuiteAndTestDecorator` function allows the creation of custom decorators that can be applied to both suites and tests.

```ts
import {createSuiteAndTestDecorator} from 'playwright-decorators';

const customSuiteAndTestDecorator = createSuiteAndTestDecorator(
  'customSuiteAndTestDecorator',
  ({ suite }) => {
    // custom suite decorator code
  },
  ({ test }) => {
    // custom@test decorator code
  }
)
```
