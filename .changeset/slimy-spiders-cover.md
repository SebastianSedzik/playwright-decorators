---
"playwright-decorators": minor
---

Add support for fixtures

This release introduce a new method `extend<T>(customFixture)` that allows to create decorators (`afterAll`, `afterEach`, `test`, `beforeAll`, `beforeEach`) with access to custom fixtures.

```ts
import { test as base } from 'playwright';
import { suite, test, extend } from 'playwright-decorators';

// #1 Create fixture type
type UserFixture = {
    user: {
      firstName: string;
      lastName: string;
    }
}

// #2 Create user fixture
const withUser = base.extend<UserFixture>({
    user: async ({}, use) => {
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
