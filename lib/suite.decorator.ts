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
  
  /**
   * Run playwright.describe function using all collected data.
   */
  run() {
    playwright.describe(this.name, () => {
      return this.runSuite(() => new this.suiteClass())
    });
  }
}

export type SuiteDecoratedMethod = { suiteDecorator: SuiteDecorator };

/**
 * Mark class as test suite.
 * Decorator creates a `describe` block and runs all methods decorated by `@test` inside it.
 *
 * Behaviour of decorator can be modified by other decorators using injected `suiteDecorator` property.
 */
export const suite = (options: SuiteDecoratorOptions = {}) => function<T extends Constructor>(constructor: T, context?: ClassMethodDecoratorContext) {
  const suiteDecorator = new SuiteDecorator(constructor, options);
  
  /**
   * Decorate class by `suiteDecorator` property, to allow other decorators to modify suite behaviour / options.
   */
  Object.assign(constructor, { suiteDecorator });

  context?.addInitializer(() => {
    suiteDecorator.run();
  })
}
