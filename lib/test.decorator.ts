import playwright from '@playwright/test';

class TestDecorator {
  /**
   * Name of the test. Default: name of the method
   */
  name: string;

  constructor(private testMethod: any, private testMethodContext: any) {
    this.name = testMethod.name;
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
export function test(originalMethod: any, context: ClassMemberDecoratorContext) {
  const testDecorator = new TestDecorator(originalMethod, context);
  
  Object.assign(originalMethod, { testDecorator });

  context.addInitializer(function () {
    testDecorator.run();
  });
}
