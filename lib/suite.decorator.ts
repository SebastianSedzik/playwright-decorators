import playwright from '@playwright/test';

type Constructor = { new (...args: any[]): any };

class SuiteDecorator {
  /**
   * Name of the suite. Default: name of the suite class
   */
  name = '';

  constructor(private suiteClass: Constructor) {
    this.name = suiteClass.name;
  }
  
  private runSuite(userSuiteCode: () => Promise<any>) {
    return userSuiteCode();
  }

  run() {
    playwright.describe(this.name, () => {
      return this.runSuite(() => new this.suiteClass())
    });
  }
}

export type SuiteDecoratedMethod = { suiteDecorator: SuiteDecorator };

/**
 * Mark class as test suite.
 */
export function suite<T extends Constructor>(constructor: T, context?: ClassMethodDecoratorContext) {
  const suiteDecorator = new SuiteDecorator(constructor);

  Object.assign(constructor, { suiteDecorator });

  context?.addInitializer(() => {
    suiteDecorator.run();
  })
}
