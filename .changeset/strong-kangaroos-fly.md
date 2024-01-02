---
'playwright-decorators': minor
---


Enhanced TypeScript support:

- constrained the `@suite` decorator to class contexts only.
- constrained the `@test` decorator to class method context only. Type check of test method arguments.
- exported the `TestArgs` type to provide validity within test methods.

```ts
import { suite, test, TestArgs } from 'playwright-decorators';

@suite()
class ExampleSuite {
  @test()
  async exampleTest({ page }: TestArgs) { // <- TestArgs ensures correct types of arguments
    // ...
 }
}
```
