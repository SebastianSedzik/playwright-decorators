import playwright from '@playwright/test'
import { decoratePlaywrightTest } from './helpers'
import { TestMethod, TestType } from './common'

export interface BeforeAllDecoratorOptions<T> {
  /**
   * Custom playwright instance to use instead of standard one.
   * For example, provide result of `playwright.extend<T>(customFixture)` to ensure availability of custom fixture in the `beforeAll` hook.
   */
  playwright?: TestType<T>
}

/**
 * Run method before all tests in the suite.
 * Target class should be marked by @suite decorator.
 */
export const beforeAll = <T = void>(options?: BeforeAllDecoratorOptions<T>) =>
  function (originalMethod: TestMethod<T>, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      const decoratedBeforeAll = decoratePlaywrightTest<T>(
        originalMethod,
        (originalMethod) =>
          (...args) =>
            originalMethod.call(this, ...args)
      )

      const { beforeAll } = options?.playwright || (playwright as TestType<T>)

      beforeAll(decoratedBeforeAll)
    })
  }
