import playwright from '@playwright/test';
import {decoratePlaywrightTest} from "./helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AfterEachOptions {}

/**
 * Run method after each test in suite.
 * Target class should be marked by @suite decorator.
 */
export const afterEach = (options: AfterEachOptions = {}) => function(originalMethod: any, context: any) {
  (context as ClassMemberDecoratorContext ).addInitializer(function () {
    
    const decoratedBeforeEach = decoratePlaywrightTest(
      originalMethod,
      originalMethod => (...args) => originalMethod.call(this, ...args)
    );

    playwright.afterEach(decoratedBeforeEach);
  });
}
