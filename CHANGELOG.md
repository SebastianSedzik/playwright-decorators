### Changelog

## 0.15.0

### Minor Changes

- [#56](https://github.com/SebastianSedzik/playwright-decorators/pull/56) [`3a44870`](https://github.com/SebastianSedzik/playwright-decorators/commit/3a44870c0ef5f420744d944549fb0491cb1cb199) Thanks [@{](https://github.com/{), [@async](https://github.com/async)! - Add support for fixtures

  This release introduce a new method `extend<T>(customFixture)` that allows to create decorators (`afterAll`, `afterEach`, `test`, `beforeAll`, `beforeEach`) with access to custom fixtures.

  ```ts
  import { test as base } from 'playwright';
  import { suite, test, extend } from 'playwright-decorators';

  // #1 Create fixture type
  type UserFixture = {

        firstName: string;
        lastName: string;
      }
  }

  // #2 Create user fixture
  const withUser = base.extend<UserFixture>({
   ({}, use) => {
          await use({
              firstName: 'John',
              lastName: 'Doe'
          })
      }
  })

  // #3 Generate afterAll, afterEach, test, beforeAll, beforeEach decorators with access to the user fixture
  const {
      afterAll,
      afterEach,
      test,
      beforeAll,
      beforeEach,
  } = extend<UserFixture>(withUser);

  // #4 Use decorators
  @suite()
  class MyTestSuite {
      @beforeAll()
      async beforeAll({ user }: TestArgs<UserFixture>) { // have access to user fixture
          // ...
      }

      @test()
      async test({ user }: TestArgs<UserFixture>) { // have access to user fixture
          // ...
      }
  }
  ```

## 0.14.3

### Patch Changes

- [#51](https://github.com/SebastianSedzik/playwright-decorators/pull/51) [`a83fc39`](https://github.com/SebastianSedzik/playwright-decorators/commit/a83fc39a06190a3b5f32058583e7b9e73da8de4c) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - `@test` and `@suite` decorators do no longer keep logic related to `fail`, `only`, `skip`, `slow`. Code was moved to dedicated decorators.

## 0.14.2

### Patch Changes

- [#49](https://github.com/SebastianSedzik/playwright-decorators/pull/49) [`f76265e`](https://github.com/SebastianSedzik/playwright-decorators/commit/f76265e15a56cba54839a4f51bafa5c5aaa0a20b) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump development dependencies

## 0.14.1

### Patch Changes

- [#44](https://github.com/SebastianSedzik/playwright-decorators/pull/44) [`e8997d2`](https://github.com/SebastianSedzik/playwright-decorators/commit/e8997d299cc4709fb844e00a1561cef44c647cb7) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Redact error messages thrown by custom decorators: `createSuiteDecorator`, `createTestDecorator`, `createSuiteAndTestDecorator`

## 0.14.0

### Minor Changes

- [#40](https://github.com/SebastianSedzik/playwright-decorators/pull/40) [`a50e25b`](https://github.com/SebastianSedzik/playwright-decorators/commit/a50e25b1d5abf8c10b1fde965767cb6f0770751b) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Add `@debug` decorator

  Runs a `@test`(s) or `@suite`(s) in debug mode.
  Tests or suites without the `@debug` decorator will not be excluded.
  Learn more about debug mode: https://playwright.dev/docs/debug

  ```ts
  import { suite, test, debug, TestArgs } from "playwright-decorators";

  // Debug selected test suite(s)
  @debug() // <-- Decorate suite with @debug()
  @suite()
  class DebugTestSuite {}

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

- [#42](https://github.com/SebastianSedzik/playwright-decorators/pull/42) [`a2e7892`](https://github.com/SebastianSedzik/playwright-decorators/commit/a2e7892221878a69282cd16107ce28481faba629) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Add `@preview` decorator

  Runs a `@test`(s) or `@suite`(s) in preview (headed browser) mode, simulating user interaction (slowing down each operation by 1000ms).
  Tests or suites without the `@preview` decorator will not be excluded.

  ```ts
  import { suite, test, preview, TestArgs } from "playwright-decorators";

  // Preview selected test suite(s)
  @preview() // <-- Decorate suite with @preview()
  @suite()
  class PreviewTestSuite {}

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

### Patch Changes

- [#43](https://github.com/SebastianSedzik/playwright-decorators/pull/43) [`ccc39fc`](https://github.com/SebastianSedzik/playwright-decorators/commit/ccc39fc17d72059c9b034a1adff4f4949258b29c) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Restructure readme file

## 0.13.0

### Minor Changes

- [#38](https://github.com/SebastianSedzik/playwright-decorators/pull/38) [`dbea0b6`](https://github.com/SebastianSedzik/playwright-decorators/commit/dbea0b680f302cc5381406ef4467cd48afb2fee6) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Added support for creating custom test and suite decorator

  ```ts
  import { createSuiteAndTestDecorator } from "playwright-decorators";
  import playwright from "@playwright/test";

  const mySuiteAndTestDecorator = createSuiteAndTestDecorator(
    "mySuiteAndTestDecorator",
    ({ suite }) => {
      suite.initialized(() => {
        /** run custom code when suite is initialized **/
      });
    },
    ({ test }) => {
      test.beforeTest(() => {
        /** run custom code before test execution **/
      });
      test.afterTest(() => {
        /** run custom code after test execution **/
      });

      playwright.beforeEach(() => {
        /** run custom code before each test execution **/
      });
    },
  );
  ```

### Patch Changes

- [#38](https://github.com/SebastianSedzik/playwright-decorators/pull/38) [`dbea0b6`](https://github.com/SebastianSedzik/playwright-decorators/commit/dbea0b680f302cc5381406ef4467cd48afb2fee6) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Export `TestInfo` type

  ```ts
  import { suite, test, TestArgs, TestInfo } from "@playwright/test";

  @suite()
  class TestSuite {
    @test()
    myTest({ page }: TestArgs, testInfo: TestInfo) {
      // ...
    }
  }
  ```

## 0.12.0

### Minor Changes

- [#35](https://github.com/SebastianSedzik/playwright-decorators/pull/35) [`8ba55c6`](https://github.com/SebastianSedzik/playwright-decorators/commit/8ba55c6463a1f431896496f47f78730dded43a6c) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Enhanced TypeScript support:

  - constrained the `@suite` decorator to class contexts only.
  - constrained the `@test` decorator to class method context only. Type check of test method arguments.
  - exported the `TestArgs` type to provide validity within test methods.

  ```ts
  import { suite, test, TestArgs } from "playwright-decorators";

  @suite()
  class ExampleSuite {
    @test()
    async exampleTest({ page }: TestArgs) {
      // <- TestArgs ensures correct types of arguments
      // ...
    }
  }
  ```

### Patch Changes

- [#29](https://github.com/SebastianSedzik/playwright-decorators/pull/29) [`7398cc2`](https://github.com/SebastianSedzik/playwright-decorators/commit/7398cc2a9aea7c8df3db76bd82714ae94b50011e) Thanks [@SebastianSedzik](https://github.com/SebastianSedzik)! - Fixes of `@skip` and `@annotate` decorators:

  - Pass `reason` from `@skip` decorator to the reporter.
  - Added support for annotations on skipped tests.

## 0.11.2

### Patch Changes

- 95c69a7: Use changeset to release process. Make test release

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

Generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog).

#### [0.11.1](https://github.com/SebastianSedzik/playwright-decorators/compare/0.11.0...0.11.1)

- docs: add examples [`#28`](https://github.com/SebastianSedzik/playwright-decorators/pull/28)

#### [0.11.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.10.1...0.11.0)

> 29 December 2023

- feat: add support for custom decorators [`#27`](https://github.com/SebastianSedzik/playwright-decorators/pull/27)
- chore: release v0.11.0 [`dbc769b`](https://github.com/SebastianSedzik/playwright-decorators/commit/dbc769bf85130a87613c75f5a7dd14ba3b03e828)

#### [0.10.1](https://github.com/SebastianSedzik/playwright-decorators/compare/0.10.0...0.10.1)

> 4 August 2023

- docs: remove unstable API warning from docs [`#25`](https://github.com/SebastianSedzik/playwright-decorators/pull/25)
- chore: release v0.10.1 [`32dc5da`](https://github.com/SebastianSedzik/playwright-decorators/commit/32dc5daa24867d8efa5d68850d6c43b62eaec10c)

#### [0.10.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.9.0...0.10.0)

> 31 July 2023

- feat: throw errors when missing `@test` or `@suite` decorators for given test or class [`#24`](https://github.com/SebastianSedzik/playwright-decorators/pull/24)
- chore: release v0.10.0 [`7f21318`](https://github.com/SebastianSedzik/playwright-decorators/commit/7f213181f24d464c7f433513140add8945d20f24)

#### [0.9.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.8.1...0.9.0)

> 26 July 2023

- feat: add `@annotation` decorator [`#23`](https://github.com/SebastianSedzik/playwright-decorators/pull/23)
- chore: release v0.9.0 [`44918a3`](https://github.com/SebastianSedzik/playwright-decorators/commit/44918a3a870493e139e0272f3db986ab8b582be9)

#### [0.8.1](https://github.com/SebastianSedzik/playwright-decorators/compare/0.8.0...0.8.1)

> 22 July 2023

- docs: add npm package version and test status badges to readme [`#22`](https://github.com/SebastianSedzik/playwright-decorators/pull/22)
- chore: release v0.8.1 [`5d15406`](https://github.com/SebastianSedzik/playwright-decorators/commit/5d1540690e6095d5ecc00c5ea5a57ca17440b831)

#### [0.8.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.7.1...0.8.0)

> 22 July 2023

- feat: add `@fixme` decorator [`#21`](https://github.com/SebastianSedzik/playwright-decorators/pull/21)
- chore: release v0.8.0 [`28aa5d0`](https://github.com/SebastianSedzik/playwright-decorators/commit/28aa5d01ffc42dd4e0c6644230860fecf392ba48)

#### [0.7.1](https://github.com/SebastianSedzik/playwright-decorators/compare/0.7.0...0.7.1)

> 20 July 2023

- chore: dependency update [`#20`](https://github.com/SebastianSedzik/playwright-decorators/pull/20)
- chore: release v0.7.1 [`be51ffb`](https://github.com/SebastianSedzik/playwright-decorators/commit/be51ffb6b59b3ffe2d653891b4f01dc91fede484)

#### [0.7.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.6.0...0.7.0)

> 20 July 2023

- chore: fix release process [`#19`](https://github.com/SebastianSedzik/playwright-decorators/pull/19)
- feat: add `@fail` decorator [`#18`](https://github.com/SebastianSedzik/playwright-decorators/pull/18)
- chore: release v0.7.0 [`0e48603`](https://github.com/SebastianSedzik/playwright-decorators/commit/0e486033166d7e597b3e055a9f0c1eba5147896f)

#### [0.6.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.5.0...0.6.0)

> 17 July 2023

- feat: add `@tag` decorator [`#17`](https://github.com/SebastianSedzik/playwright-decorators/pull/17)
- chore: release v0.6.0 [`f7bbe46`](https://github.com/SebastianSedzik/playwright-decorators/commit/f7bbe46641e2d5a1889b8bd22a962e5e8c0ebe4a)

#### [0.5.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.4.0...0.5.0)

> 16 July 2023

- feat: add `@only` decorator [`#16`](https://github.com/SebastianSedzik/playwright-decorators/pull/16)
- test: fix `@slow` tests [`6359e65`](https://github.com/SebastianSedzik/playwright-decorators/commit/6359e65ec6bb52d564a179d5ae854560c53c7090)
- chore: release v0.5.0 [`8d69e29`](https://github.com/SebastianSedzik/playwright-decorators/commit/8d69e29f03d7cbbaa27b4ef27e6a4d4a238cf57c)
- docs: fix formatting [`92b3e36`](https://github.com/SebastianSedzik/playwright-decorators/commit/92b3e36981d0ae66be117240121035a51e15ed86)

#### [0.4.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.3.0...0.4.0)

> 15 July 2023

- feat: add `@slow` decorator [`#15`](https://github.com/SebastianSedzik/playwright-decorators/pull/15)
- chore: release v0.4.0 [`f7de0c4`](https://github.com/SebastianSedzik/playwright-decorators/commit/f7de0c42ef0889c36d1efc593d23e92c468a8a4a)

#### [0.3.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.2.0...0.3.0)

> 15 July 2023

- chore: add keywords, license, fix peerDeps [`#14`](https://github.com/SebastianSedzik/playwright-decorators/pull/14)
- feat(skip): add skip decorator [`#13`](https://github.com/SebastianSedzik/playwright-decorators/pull/13)
- chore: release v0.3.0 [`545e2c2`](https://github.com/SebastianSedzik/playwright-decorators/commit/545e2c2972c9112fcc8048ea6215c8549f483a85)

#### [0.2.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.1.2...0.2.0)

> 13 July 2023

- feat: add `afterAll`, `afterEach`, `beforeAll`, `beforeEach` decorators [`#12`](https://github.com/SebastianSedzik/playwright-decorators/pull/12)
- fix: use dynamic fixtures instead of hardcoded [`#11`](https://github.com/SebastianSedzik/playwright-decorators/pull/11)
- chore: release v0.2.0 [`bff619f`](https://github.com/SebastianSedzik/playwright-decorators/commit/bff619f29699aca937fd6c28d32d6ab87c236653)

#### [0.1.2](https://github.com/SebastianSedzik/playwright-decorators/compare/0.1.1...0.1.2)

> 12 July 2023

- fix: access to fixtures from @test method [`#10`](https://github.com/SebastianSedzik/playwright-decorators/pull/10)
- chore: release v0.1.2 [`516c41f`](https://github.com/SebastianSedzik/playwright-decorators/commit/516c41faf8f62fab1d0f82e2df0fb35bc3f401ec)
- docs: add banner about early stage [`8a72868`](https://github.com/SebastianSedzik/playwright-decorators/commit/8a72868646917c9fd73931e642d9524cefb6a055)

#### [0.1.1](https://github.com/SebastianSedzik/playwright-decorators/compare/0.1.0...0.1.1)

> 11 July 2023

- fix: fix `this` context in `@test` method [`#9`](https://github.com/SebastianSedzik/playwright-decorators/pull/9)
- ci: add GH actions for building, linting and testing package before merge [`#8`](https://github.com/SebastianSedzik/playwright-decorators/pull/8)
- chore: update changelog [`4b0cabf`](https://github.com/SebastianSedzik/playwright-decorators/commit/4b0cabf7a5461c71dc2eb0b98f056dd458e185a5)
- chore: release v0.1.1 [`657f1c4`](https://github.com/SebastianSedzik/playwright-decorators/commit/657f1c409cee8b863226516300a82689c746f6d3)

#### [0.1.0](https://github.com/SebastianSedzik/playwright-decorators/compare/0.0.1...0.1.0)

> 11 July 2023

- chore: add release process [`#7`](https://github.com/SebastianSedzik/playwright-decorators/pull/7)
- add tests, refactors base decorators, update readme [`#6`](https://github.com/SebastianSedzik/playwright-decorators/pull/6)
- refactor: refactor suite and test decorators [`#5`](https://github.com/SebastianSedzik/playwright-decorators/pull/5)
- chore: release v0.1.0 [`2011458`](https://github.com/SebastianSedzik/playwright-decorators/commit/20114585cc73e81efdcc900e7cfee6b660e40503)
- chore: fix release process command [`18d274b`](https://github.com/SebastianSedzik/playwright-decorators/commit/18d274b90fcb31be0145e5a971dfb73a7f40b091)

#### 0.0.1

> 9 July 2023

- ci: automate release [`#4`](https://github.com/SebastianSedzik/playwright-decorators/pull/4)
- feat: add suite & test decorators [`#3`](https://github.com/SebastianSedzik/playwright-decorators/pull/3)
- ci: automate release [`#2`](https://github.com/SebastianSedzik/playwright-decorators/pull/2)
- chore: use linter & prettier [`#1`](https://github.com/SebastianSedzik/playwright-decorators/pull/1)
- chore: initialize repo [`6ec32a4`](https://github.com/SebastianSedzik/playwright-decorators/commit/6ec32a4711fc0eaa2ce17ae38cfc709d2c78d178)
- docs: initialize repo [`6899678`](https://github.com/SebastianSedzik/playwright-decorators/commit/6899678ba0b370b2712de8bebdbc77c885bd271e)
