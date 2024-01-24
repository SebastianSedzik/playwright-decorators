import playwright from '@playwright/test'
import { decoratePlaywrightTest } from './helpers'
import { TestMethod, TestType } from './common'

export interface BeforeEachDecoratorOptions<T> {
  /**
   * Custom playwright instance to use instead of standard one.
   * For example, provide result of `playwright.extend<T>(customFixture)` to ensure availability of custom fixture in the `beforeEach` hook.
   */
  playwright?: TestType<T>
}

/**
 * Run method before each test in the suite.
 * Target class should be marked by @suite decorator.
 */
export const beforeEach = <T = void>(options?: BeforeEachDecoratorOptions<T>) =>
  function (originalMethod: TestMethod<T>, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      const decoratedBeforeEach = decoratePlaywrightTest<T>(
        originalMethod,
        (originalMethod) =>
          (...args) =>
            originalMethod.call(this, ...args)
      )

      const { beforeEach } = options?.playwright || (playwright as TestType<T>)

      beforeEach(decoratedBeforeEach)
    })
  }
