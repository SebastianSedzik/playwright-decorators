import playwright from '@playwright/test';
import {decoratePlaywrightTest, TestDecoratorFunction} from "./helpers";
import {isSuiteDecoratedMethod} from "./suite.decorator";

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
   * Marks a test as "should fail".
   * Playwright Test runs this test and ensures that it is actually failing.
   * This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixe
   */
  fail?: string | boolean
  /**
   * Marks a test as "fixme", with the intention to fix (with optional reason).
   * Decorated test will not be run.
   */
  fixme?: string | boolean;
  /**
   * Declares a focused test.
   * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
   */
  only?: boolean;
  /**
   * Add custom annotation to a test.
   * Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.
   */
  annotations?: {type: string, description?: string}[];
}

class TestDecorator implements TestDecoratorOptions {
  name: string;
  skip: string | boolean = false;
  slow: string | boolean = false;
  fail: string | boolean = false;
  fixme: string | boolean = false;
  only = false;
  annotations: {type: string, description?: string}[] = [];

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
  
  private handleFail() {
    if (this.fail === false) {
      return;
    }

    if (typeof this.fail === 'string') {
      return playwright.fail(true, this.fail);
    }

    return playwright.fail();
  }
  
  private handleFixme() {
    if (this.fixme === false) {
      return;
    }

    if (typeof this.fixme === 'string') {
      return playwright.fixme(true, this.fixme);
    }

    return playwright.fixme();
  }
  
  private handleAnnotations() {
    this.annotations.forEach(annotation => {
      playwright.info().annotations.push(annotation);
    });
  }

  /**
   * Run playwright.test function using all collected data.
   */
  run(executionContext: any) {
    const decoratedTest: TestDecoratorFunction = (testFunction) => (...args) => {
      this.handleSkip();
      this.handleSlow();
      this.handleFail();
      this.handleFixme();
      this.handleAnnotations();

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

type TestDecoratedMethod = { testDecorator: TestDecorator };

export function isTestDecoratedMethod(method: any): method is TestDecoratedMethod {
  return (method as TestDecoratedMethod).testDecorator !== undefined;
}

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

  (context as ClassMemberDecoratorContext).addInitializer(function () {
    testDecorator.run(this);
  });
}
