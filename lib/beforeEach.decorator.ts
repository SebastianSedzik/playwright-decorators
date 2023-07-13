import playwright from '@playwright/test';
import {decoratePlaywrightTest} from "./helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BeforeEachOption {}

/**
 * Run method before each test in the suite.
 * Target class should be marked by @suite decorator.
 */
export const beforeEach = (options: BeforeEachOption = {}) => function(originalMethod: any, context: any) {
  (context as ClassMemberDecoratorContext ).addInitializer(function () {
    
    const decoratedBeforeEach = decoratePlaywrightTest(
      originalMethod,
      originalMethod => (...args) => originalMethod.call(this, ...args)
    );

    playwright.beforeEach(decoratedBeforeEach);
  });
}
