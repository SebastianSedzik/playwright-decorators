import playwright from '@playwright/test';

type Constructor = { new (...args: any[]): any };

interface SuiteDecoratorOptions {
  /**
   * Name of the suite. Default: name of the suite class
   */
  name?: string;
}

class SuiteDecorator implements SuiteDecoratorOptions {
  name: string;

  constructor(private suiteClass: Constructor, options: SuiteDecoratorOptions) {
    this.name = suiteClass.name;

    Object.assign(this, options);
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
export const suite = (options: SuiteDecoratorOptions = {}) => function<T extends Constructor>(constructor: T, context?: ClassMethodDecoratorContext) {
  const suiteDecorator = new SuiteDecorator(constructor, options);

  Object.assign(constructor, { suiteDecorator });

  context?.addInitializer(() => {
    suiteDecorator.run();
  })
}
