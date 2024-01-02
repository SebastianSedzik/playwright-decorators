import playwright from '@playwright/test'
import { decoratePlaywrightTest } from './helpers'
import { TestMethod } from './common'

/**
 * Run method after each test in suite.
 * Target class should be marked by @suite decorator.
 */
export const afterEach = () =>
  function (originalMethod: TestMethod, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      const decoratedBeforeEach = decoratePlaywrightTest(
        originalMethod,
        (originalMethod) =>
          (...args) =>
            originalMethod.call(this, ...args)
      )

      playwright.afterEach(decoratedBeforeEach)
    })
  }
