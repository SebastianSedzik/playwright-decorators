import playwright from '@playwright/test'
import { TestClass } from './common'

type SuiteHook = () => void

interface SuiteDecoratorOptions {
  /**
   * Name of the suite. Default: name of the suite class
   */
  name?: string
  /**
   * Declares a focused suite.
   * If there are some focused @test(s) or @suite(s), all of them will be run but nothing else.
   */
  only?: boolean
}

export class SuiteDecorator implements SuiteDecoratorOptions {
  name: string
  only = false

  private initializedHooks: SuiteHook[] = []

  constructor(
    private suiteClass: TestClass,
    options: SuiteDecoratorOptions
  ) {
    this.name = suiteClass.name

    Object.assign(this, options)
  }

  private handleInitializedHooks() {
    return Promise.all(this.initializedHooks.map((hookFn) => hookFn()))
  }

  private async runSuite(userSuiteCode: () => Promise<void>) {
    this.handleInitializedHooks()

    return userSuiteCode()
  }

  /**
   * Run playwright.describe function using all collected data.
   */
  run() {
    const suiteRunner = this.only ? playwright.describe.only : playwright.describe

    suiteRunner(this.name, () => this.runSuite(() => new this.suiteClass()))
  }

  /**
   * Declares an `initialized` hook that is executed in `playwright.describe` context, when suite is executed.
   * It is equivalent to code: playwright.describe(..., () => { initialized(); ... })
   */
  initialized(hookFn: SuiteHook) {
    this.initializedHooks.push(hookFn)
  }
}

type SuiteDecoratedMethod = { suiteDecorator: SuiteDecorator }

export function isSuiteDecoratedMethod(method: any): method is SuiteDecoratedMethod {
  return (method as SuiteDecoratedMethod).suiteDecorator !== undefined
}

/**
 * Mark class as test suite.
 * Decorator creates a `describe` block and runs all methods decorated by `@test` inside it.
 *
 * Behaviour of decorator can be modified by other decorators using injected `suiteDecorator` property.
 */
export const suite = (options: SuiteDecoratorOptions = {}) =>
  function <T extends TestClass>(constructor: T, context: ClassDecoratorContext) {
    const suiteDecorator = new SuiteDecorator(constructor, options)

    /**
     * Decorate class by `suiteDecorator` property, to allow other decorators to modify suite behaviour / options.
     */
    Object.assign(constructor, { suiteDecorator })

    context.addInitializer(() => {
      suiteDecorator.run()
    })
  }
