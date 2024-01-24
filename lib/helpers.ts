import { TestMethod } from './common'

export type TestDecoratorFunction = <T>(testFunction: TestMethod<T>) => TestMethod<T>

/**
 * Wrap a playwright test function with class method, and make it visible externally as original one (function description).
 * It is required, as @playwright/test function do not accept rest parameters.
 */
export const decoratePlaywrightTest = <T>(
  testFunction: TestMethod<T>,
  decorationFunction: TestDecoratorFunction
) => {
  const decoratedTestFunction = decorationFunction(testFunction)

  // expose original function description
  decoratedTestFunction.toString = () => testFunction.toString()

  return decoratedTestFunction
}
