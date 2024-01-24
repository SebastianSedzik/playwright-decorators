import playwright, { expect, test as base } from '@playwright/test'
import { extend } from '../lib/extend'
import { suite, TestArgs } from '../lib'

playwright.describe('extend', () => {
  type UserFixture = {
    user: {
      firstName: string
      lastName: string
    }
  }

  const withUser = base.extend<UserFixture>({
    // eslint-disable-next-line no-empty-pattern
    user: async ({}, use) => {
      await use({
        firstName: 'John',
        lastName: 'Doe'
      })
    }
  })

  const { test, beforeEach, beforeAll, afterEach, afterAll } = extend<UserFixture>(withUser)

  @suite()
  class ExtendUtilSuite {
    @beforeAll()
    'should custom fixture be available in before all'({ user }: TestArgs<UserFixture>) {
      expect(user).toBeDefined()
    }

    @beforeEach()
    'should custom fixture be available in before each'({ user }: TestArgs<UserFixture>) {
      expect(user).toBeDefined()
    }

    @afterAll()
    'should custom fixture be available in after all'({ user }: TestArgs<UserFixture>) {
      expect(user).toBeDefined()
    }

    @afterEach()
    'should custom fixture be available in after each'({ user }: TestArgs<UserFixture>) {
      expect(user).toBeDefined()
    }

    @test()
    'should custom fixture be available in test'({ user }: TestArgs<UserFixture>) {
      expect(user).toBeDefined()
    }
  }
})
