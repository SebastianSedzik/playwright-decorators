import playwright from '@playwright/test';
import {TestClass} from "./common";

type SuiteHook = () => void;

interface SuiteDecoratorOptions {
  /**
   * Name of the suite. Default: name of the suite class
   */
  name?: string;
  /**
   * Skip suite (with optional reason)
   */
  skip?: string | boolean;
  /**
   * Mark suite as "slow" (with optional reason).
   * Slow test will be given triple the default timeout.
   */
  slow?: string | boolean;
  /**
   * Marks a suite as "should fail".
   * Playwright Test runs all test from suite and ensures that they are actually failing.
   * This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixe
   */
  fail?: string | boolean
  /**
   * Marks a suite as "fixme", with the intention to fix (with optional reason).
   * Decorated suite will not be run.
   */
  fixme?: string | boolean;
  /**
   * Declares a focused suite.
   * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
   */
  only?: boolean;
}

export class SuiteDecorator implements SuiteDecoratorOptions {
  name: string;
  skip: string | boolean = false;
  slow: string | boolean = false;
  fail: string | boolean = false;
  fixme: string | boolean = false;
  only = false;

  private initializedHooks: SuiteHook[] = [];

  constructor(private suiteClass: TestClass, options: SuiteDecoratorOptions) {
    this.name = suiteClass.name;

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

    if (typeof this.slow === 'string') {
      return playwright.slow(true, this.slow);
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
  
  private handleInitializedHooks() {
    return Promise.all(this.initializedHooks.map(hookFn => hookFn()));
  }

  private async runSuite(userSuiteCode: () => Promise<void>) {
    this.handleSkip();
    this.handleSlow();
    this.handleFail();
    this.handleFixme();
    this.handleInitializedHooks();

    return userSuiteCode();
  }
  
  /**
   * Run playwright.describe function using all collected data.
   */
  run() {
    const playwrightRunSuite = this.only ? playwright.describe.only : playwright.describe;

    playwrightRunSuite(this.name, () => {
      return this.runSuite(() => new this.suiteClass())
    });
  }
  
  /**
   * Declares an `initialized` hook that is executed after suite is initialized.
   */
  initialized(hookFn: SuiteHook) {
    this.initializedHooks.push(hookFn);
  }
}

type SuiteDecoratedMethod = { suiteDecorator: SuiteDecorator };

export function isSuiteDecoratedMethod(method: any): method is SuiteDecoratedMethod {
  return (method as SuiteDecoratedMethod).suiteDecorator !== undefined;
}

/**
 * Mark class as test suite.
 * Decorator creates a `describe` block and runs all methods decorated by `@test` inside it.
 *
 * Behaviour of decorator can be modified by other decorators using injected `suiteDecorator` property.
 */
export const suite = (options: SuiteDecoratorOptions = {}) => function<T extends TestClass>(constructor: T, context: ClassDecoratorContext) {
  const suiteDecorator = new SuiteDecorator(constructor, options);

  /**
   * Decorate class by `suiteDecorator` property, to allow other decorators to modify suite behaviour / options.
   */
  Object.assign(constructor, { suiteDecorator });

  context.addInitializer(() => {
    suiteDecorator.run();
  })
}
