import playwright from '@playwright/test'
import { decoratePlaywrightTest } from './helpers'
import { TestMethod } from './common'

/**
 * Run method after all tests in the suite.
 * Target class should be marked by @suite decorator.
 */
export const afterAll = () =>
  function (originalMethod: TestMethod, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      const decoratedBeforeAll = decoratePlaywrightTest(
        originalMethod,
        (originalMethod) =>
          (...args) =>
            originalMethod.call(this, ...args)
      )

      playwright.afterAll(decoratedBeforeAll)
    })
  }
