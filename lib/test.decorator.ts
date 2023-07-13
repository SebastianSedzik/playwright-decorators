import playwright from '@playwright/test';
import {decoratePlaywrightTest, TestDecoratorFunction} from "./helpers";

interface TestDecoratorOptions {
  /**
   * Name of the test. Default: name of the method
   */
  name?: string;
}

class TestDecorator implements TestDecoratorOptions {
  name: string;

  constructor(private testMethod: any, options: TestDecoratorOptions) {
    this.name = testMethod.name;
    
    Object.assign(this, options);
  }
  
  /**
   * Run playwright.test function using all collected data.
   */
  run(executionContext: any) {
    const decoratedTest: TestDecoratorFunction = (testFunction) => (...args) => {
      // set correct executionContext (test class)
      return testFunction.call(executionContext, ...args);
    };

    const decoratedTestMethod = decoratePlaywrightTest(
      this.testMethod,
      decoratedTest
    );

    playwright(this.name, decoratedTestMethod);
  }
}

export type TestDecoratedMethod = { testDecorator: TestDecorator };

/**
 * Mark method as test.
 * Decorator creates a `test` block and runs method inside it.
 * Target class should be marked by @suite decorator.
 *
 * Behaviour of decorator can be modified by other decorators using injected `testDecorator` property.
 */
export const test = (options: TestDecoratorOptions = {}) => function(originalMethod: any, context: any) {
  const testDecorator = new TestDecorator(originalMethod, options);

  Object.assign(originalMethod, { testDecorator });

  (context as ClassMemberDecoratorContext ).addInitializer(function () {
    testDecorator.run(this);
  });
}
