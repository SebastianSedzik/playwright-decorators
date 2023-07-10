import playwright from '@playwright/test';

class TestDecorator {
  onBeforeTestListeners: (() => void)[] = [];
  
  /**
   * Run inside test() call, before original test code execution
   * @param callback
   */
  onBeforeTest(callback: () => void) {
    this.onBeforeTestListeners.push(callback);
  }
  
  private runOnBeforeTestListeners() {
    this.onBeforeTestListeners.forEach(hook => hook());
  }
  
  run(constructor: any, context: any) {
    const constructorProxy = new Proxy(constructor, {
      apply: (target: any, thisArg: any, argArray: any[]) => {
        this.runOnBeforeTestListeners();
        return target.apply(context, argArray);
      }
    })

    playwright(constructor.name, constructorProxy.bind(context));
  }
}

export type TestDecoratedMethod = { testDecorator: TestDecorator };

/**
 * Mark @suite class method as test
 */
export function test(originalMethod: any, context: ClassMemberDecoratorContext) {
  const testDecorator = new TestDecorator();
  
  Object.assign(originalMethod, { testDecorator });

  context.addInitializer(function () {
    testDecorator.run(originalMethod, this);
  });
}
