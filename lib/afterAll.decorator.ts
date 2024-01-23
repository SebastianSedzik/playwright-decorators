import playwright from '@playwright/test'
import { decoratePlaywrightTest } from './helpers'
import { TestMethod, TestType } from './common'

export interface AfterAllDecoratorOptions<T> {
  /**
   * Custom playwright instance to use instead of standard one.
   * For example, provide result of `playwright.extend<T>(customFixture)` to ensure availability of custom fixture in the `afterAll` hook.
   */
  playwright?: TestType<T>
}

/**
 * Run method after all tests in the suite.
 * Target class should be marked by @suite decorator.
 */
export const afterAll = <T = unknown>(options?: AfterAllDecoratorOptions<T>) =>
  function (originalMethod: TestMethod<T>, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      const decoratedBeforeAll = decoratePlaywrightTest<T>(
        originalMethod,
        (originalMethod) =>
          (...args) =>
            originalMethod.call(this, ...args)
      )

      const { afterAll } = options?.playwright || (playwright as TestType<T>)

      afterAll(decoratedBeforeAll)
    })
  }
