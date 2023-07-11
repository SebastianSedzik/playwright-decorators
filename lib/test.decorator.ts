import playwright from '@playwright/test';

interface TestDecoratorOptions {
  /**
   * Name of the test. Default: name of the method
   */
  name?: string;
}

class TestDecorator implements TestDecoratorOptions {
  name: string;

  constructor(private testMethod: any, private testMethodContext: any, options: TestDecoratorOptions) {
    this.name = testMethod.name;
    
    Object.assign(this, options);
  }

  private wrapTest(testCode: () => Promise<any>, wrapperCode: (args: (() => Promise<any>)) => Promise<any>) {
    return new Proxy(testCode, {
      apply: (target: any, thisArg: any, argArray: any[]) =>
          wrapperCode(() => target.apply(this.testMethodContext, argArray))
      })
  }

  private runTest(userTestCode: () => Promise<any>) {
    return userTestCode();
  }

  run() {
    const testCallback = this.wrapTest(this.testMethod, this.runTest).bind(this.testMethodContext);

    playwright(this.name, testCallback);
  }
}

export type TestDecoratedMethod = { testDecorator: TestDecorator };

/**
 * Mark method as test.
 * Method class should be marked with @suite decorator
 */
export const test = (options: TestDecoratorOptions = {}) => function(originalMethod: any, context: ClassMemberDecoratorContext) {
  const testDecorator = new TestDecorator(originalMethod, context, options);

  Object.assign(originalMethod, { testDecorator });

  context.addInitializer(function () {
    testDecorator.run();
  });
}
