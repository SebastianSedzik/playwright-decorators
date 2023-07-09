import playwright from '@playwright/test';

/**
 * Mark class method as test
 */
export function test(originalMethod: any, context: ClassMethodDecoratorContext) {
  context.addInitializer(function () {
    playwright(originalMethod.name, originalMethod.bind(this));
  });
}
