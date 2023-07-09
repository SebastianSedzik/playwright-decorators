import playwright from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/ban-types
type Clazz = { new (...args: any[]): {} }

/**
 * Mark class as test suite
 */
export function suite<T extends Clazz>(constructor: T) {
  playwright.describe(constructor.name, () => {
    new constructor();
  });
}
