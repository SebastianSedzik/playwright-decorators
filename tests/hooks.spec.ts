import { suite, test, afterAll, afterEach, beforeAll, beforeEach, TestArgs } from '../lib'
import playwright, { expect } from '@playwright/test'

playwright.describe('hooks decorators', () => {
  const called: string[] = []

  @suite()
  class HooksSuite {
    @beforeAll()
    beforeAll({ browser }: TestArgs) {
      called.push('beforeAll')

      // ensure correctness of `this` context
      expect(this instanceof HooksSuite).toBeTruthy()

      // ensure fixture is passed
      expect(browser).not.toBeUndefined()
    }

    @beforeEach()
    beforeEach({ browser }: TestArgs) {
      called.push('beforeEach')

      // ensure correctness of `this` context
      expect(this instanceof HooksSuite).toBeTruthy()

      // ensure fixture is passed
      expect(browser).not.toBeUndefined()
    }

    @afterAll()
    afterAll({ browser }: TestArgs) {
      called.push('afterAll')

      // ensure correctness of `this` context
      expect(this instanceof HooksSuite).toBeTruthy()

      // ensure fixture is passed
      expect(browser).not.toBeUndefined()
    }

    @afterEach()
    afterEach({ browser }: TestArgs) {
      called.push('afterEach')

      // ensure correctness of `this` context
      expect(this instanceof HooksSuite).toBeTruthy()

      // ensure fixture is passed
      expect(browser).not.toBeUndefined()
    }

    @test()
    testMethod() {
      called.push('testMethod')
    }
  }

  playwright.afterAll(() => {
    expect(called).toEqual(['beforeAll', 'beforeEach', 'testMethod', 'afterEach', 'afterAll'])
  })
})
