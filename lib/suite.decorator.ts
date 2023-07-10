import playwright from '@playwright/test';

class SuiteDecorator {
  onBeforeTestListeners: (() => void)[] = [];
  
  /**
   * Run after test.describe() and before test() calls
   * @param callback
   */
  onBeforeTest(callback: () => void) {
    this.onBeforeTestListeners.push(callback);
  }
  
  private runOnBeforeTestListeners() {
    this.onBeforeTestListeners.forEach(hook => hook());
  }

  run(constructor: any) {
    playwright.describe(constructor.name, () => {
      this.runOnBeforeTestListeners();
      new constructor();
    });
  }
}

export type SuiteDecoratedMethod = { suiteDecorator: SuiteDecorator };

/**
 * Mark class as test suite
 */
export function suite<T extends { new (...args: any[]): any }>(constructor: T, context?: ClassMethodDecoratorContext) {
  const suiteDecorator = new SuiteDecorator();

  Object.assign(constructor, { suiteDecorator });

  context?.addInitializer(() => {
    suiteDecorator.run(constructor);
  })
}
