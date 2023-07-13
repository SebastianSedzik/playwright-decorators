import {TestInfo} from "@playwright/test";

export type PlaywrightTestFunction = (args: any, testInfo: TestInfo ) => Promise<void> | void;
export type TestDecoratorFunction = (testFunction: PlaywrightTestFunction) => PlaywrightTestFunction;

/**
 * Wrap a playwright test function with class method, and make it visible externally as original one (function description).
 * It is required, as @playwright/test function do not accept rest parameters.
 */
export const decoratePlaywrightTest = (testFunction: PlaywrightTestFunction, decorationFunction: TestDecoratorFunction) => {
  const decoratedTestFunction = decorationFunction(testFunction);
  
  // expose original function description
  decoratedTestFunction.toString = () => testFunction.toString();

  return decoratedTestFunction;
}
