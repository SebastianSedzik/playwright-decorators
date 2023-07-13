import playwright from '@playwright/test';
import {decoratePlaywrightTest} from "./helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AfterAllOptions {}

/**
 * Run method after all tests in the suite.
 * Target class should be marked by @suite decorator.
 */
export const afterAll = (options: AfterAllOptions = {}) => function(originalMethod: any, context: any) {
  (context as ClassMemberDecoratorContext ).addInitializer(function () {
    
    const decoratedBeforeAll = decoratePlaywrightTest(
      originalMethod,
      originalMethod => (...args) => originalMethod.call(this, ...args)
    );

    playwright.afterAll(decoratedBeforeAll);
  });
}
