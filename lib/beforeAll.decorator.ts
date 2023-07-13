import playwright from '@playwright/test';
import {decoratePlaywrightTest} from "./helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BeforeAllOptions {}

/**
 * Run method before all tests in the suite.
 * Target class should be marked by @suite decorator.
 */
export const beforeAll = (options: BeforeAllOptions = {}) => function(originalMethod: any, context: any) {
  (context as ClassMemberDecoratorContext ).addInitializer(function () {
    
    const decoratedBeforeAll = decoratePlaywrightTest(
      originalMethod,
      originalMethod => (...args) => originalMethod.call(this, ...args)
    );

    playwright.beforeAll(decoratedBeforeAll);
  });
}
