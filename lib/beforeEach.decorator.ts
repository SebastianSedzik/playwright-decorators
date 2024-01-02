import playwright from '@playwright/test';
import {decoratePlaywrightTest} from "./helpers";
import {TestMethod} from "./common";

/**
 * Run method before each test in the suite.
 * Target class should be marked by @suite decorator.
 */
export const beforeEach = () => function(
  originalMethod: TestMethod,
  context: ClassMethodDecoratorContext
) {
  context.addInitializer(function () {
  
    const decoratedBeforeEach = decoratePlaywrightTest(
      originalMethod,
      originalMethod => (...args) => originalMethod.call(this, ...args)
    );

    playwright.beforeEach(decoratedBeforeEach);
  });
}
