import playwright from '@playwright/test'
import { decoratePlaywrightTest, TestDecoratorFunction } from './helpers'
import { TestMethod, TestType } from './common'

type TestHook = () => void | Promise<void>

export interface TestDecoratorOptions {
  /**
   * Name of the test. Default: name of the method
   */
  name?: string
  /**
   * Declares a focused test.
   * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
   */
  only?: boolean
  /**
   * Custom playwright instance to use instead of standard one.
   * For example, provide result of `playwright.extend<T>(customFixture)` to ensure availability of custom fixture in the `test` method.
   */
  playwright?: TestType
}

export class TestDecorator implements TestDecoratorOptions {
  name: string
  only = false
  playwright = playwright

  private beforeTestHooks: TestHook[] = []
  private afterTestHooks: TestHook[] = []

  constructor(
    private testMethod: any,
    options: TestDecoratorOptions
  ) {
    this.name = testMethod.name

    Object.assign(this, options)
  }

  private handleBeforeTestHooks() {
    return Promise.all(this.beforeTestHooks.map((initializer) => initializer()))
  }

  private handleAfterTestHooks() {
    return Promise.all(this.afterTestHooks.map((initializer) => initializer()))
  }

  /**
   * Run playwright.test function using all collected data.
   */
  run(executionContext: ClassMethodDecoratorContext) {
    const extendedTestMethod: TestDecoratorFunction =
      (testFunction) =>
      async (...args) => {
        await this.handleBeforeTestHooks()

        // set correct executionContext (test class)
        await testFunction.call(executionContext, ...args)

        await this.handleAfterTestHooks()
      }

    const testRunner = this.only ? this.playwright.only : this.playwright

    testRunner(this.name, decoratePlaywrightTest(this.testMethod, extendedTestMethod))
  }

  /**
   * Declares an `before` hook that is executed in `playwright()` context just before execution of test code.
   * It is equivalent to code: playwright(..., () => { beforeTest(); ... })
   */
  beforeTest(initializer: TestHook) {
    this.beforeTestHooks.push(initializer)
  }

  /**
   * Declares an `after` hook that is executed in `playwright()` context just after execution of test code.
   * It is equivalent to code: playwright(..., () => { ...; afterTest() })
   */
  afterTest(initializer: TestHook) {
    this.afterTestHooks.push(initializer)
  }
}

type TestDecoratedMethod = { testDecorator: TestDecorator }

export function isTestDecoratedMethod(method: any): method is TestDecoratedMethod {
  return (method as TestDecoratedMethod).testDecorator !== undefined
}

/**
 * Mark method as test.
 * Decorator creates a `test` block and runs method inside it.
 * Target class should be marked by @suite decorator.
 *
 * Behaviour of decorator can be modified by other decorators using injected `testDecorator` property.
 */
export const test = <T = void>(options: TestDecoratorOptions = {}) =>
  function (originalMethod: TestMethod<T>, context: ClassMethodDecoratorContext) {
    const testDecorator = new TestDecorator(originalMethod, options)

    Object.assign(originalMethod, { testDecorator })

    context.addInitializer(function () {
      testDecorator.run(this as ClassMethodDecoratorContext)
    })
  }
