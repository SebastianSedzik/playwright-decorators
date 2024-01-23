import { afterAll } from './afterAll.decorator'
import { afterEach } from './afterEach.decorator'
import { beforeAll } from './beforeAll.decorator'
import { beforeEach } from './beforeEach.decorator'
import { test } from './test.decorator'
import { TestType } from './common'

/**
 * Generates afterAll, afterEach, test, beforeAll, beforeEach decorators with access to custom fixture.
 * @param customPlaywright - method returned from playwright.extend<T>
 */
export const extend = <T>(customPlaywright: TestType<T>) => {
  return {
    afterAll: (...options: Parameters<typeof afterAll>) =>
      afterAll<T>({ ...options, playwright: customPlaywright }),
    afterEach: (...options: Parameters<typeof afterEach>) =>
      afterEach<T>({ ...options, playwright: customPlaywright }),
    test: (...options: Parameters<typeof test>) =>
      test<T>({ ...options, playwright: customPlaywright }),
    beforeAll: (...options: Parameters<typeof beforeAll>) =>
      beforeAll<T>({ ...options, playwright: customPlaywright }),
    beforeEach: (...options: Parameters<typeof beforeEach>) =>
      beforeEach<T>({ ...options, playwright: customPlaywright })
  }
}
