import playwright from '@playwright/test'
import { decoratePlaywrightTest } from './helpers'
import { TestMethod, TestType } from './common'

export interface AfterEachDecoratorOptions<T> {
  /**
   * Custom playwright instance to use instead of standard one.
   * For example, provide result of `playwright.extend<T>(customFixture)` to ensure availability of custom fixture in the `afterEach` hook.
   */
  playwright?: TestType<T>
}

/**
 * Run method after each test in suite.
 * Target class should be marked by @suite decorator.
 */
export const afterEach = <T = void>(options?: AfterEachDecoratorOptions<T>) =>
  function (originalMethod: TestMethod<T>, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      const decoratedBeforeEach = decoratePlaywrightTest<T>(
        originalMethod,
        (originalMethod) =>
          (...args) =>
            originalMethod.call(this, ...args)
      )

      const { afterEach } = options?.playwright || (playwright as TestType<T>)

      afterEach(decoratedBeforeEach)
    })
  }
