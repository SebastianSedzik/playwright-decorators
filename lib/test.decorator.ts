import playwright from '@playwright/test';
import {decoratePlaywrightTest, TestDecoratorFunction} from "./helpers";

interface TestDecoratorOptions {
  /**
   * Name of the test. Default: name of the method
   */
  name?: string;
  /**
   * Skip suite (with optional reason)
   */
  skip?: string | boolean;
  /**
   * Mark test as "slow" (with optional reason).
   * Slow test will be given triple the default timeout.
   */
  slow?: string | boolean;
  /**
   * Declares a focused test.
   * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
   */
  only?: boolean;
}

class TestDecorator implements TestDecoratorOptions {
  name: string;
  skip: string | boolean = false;
  slow: string | boolean = false;
  only = false;

  constructor(private testMethod: any, options: TestDecoratorOptions) {
    this.name = testMethod.name;
    
    Object.assign(this, options);
  }
  
  private handleSkip() {
    if (this.skip === false) {
      return;
    }

    if (typeof this.skip === 'string') {
      return playwright.skip(true, this.skip);
    }

    playwright.skip();
  }

  private handleSlow() {
    if (this.slow === false) {
      return;
    }
    
    if (typeof this.skip === 'string') {
      return playwright.slow(true, this.skip);
    }
    
    return playwright.slow();
  }
  
  /**
   * Run playwright.test function using all collected data.
   */
  run(executionContext: any) {
    const decoratedTest: TestDecoratorFunction = (testFunction) => (...args) => {
      this.handleSkip();
      this.handleSlow();

      // set correct executionContext (test class)
      return testFunction.call(executionContext, ...args);
    };

    const decoratedTestMethod = decoratePlaywrightTest(
      this.testMethod,
      decoratedTest
    );

    const playwrightRunTest = this.only ? playwright.only : playwright;

    playwrightRunTest(this.name, decoratedTestMethod);
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
