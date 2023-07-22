import {SuiteDecoratedMethod} from "./suite.decorator";
import {TestDecoratedMethod} from "./test.decorator";

/**
 * Marks a @test or @suite as "should fail".
 * Playwright Test runs this test and ensures that it is actually failing.
 * This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed.
 */
export const fail = (reason?: string) => function(originalMethod: any, context?: any) {
  if ((originalMethod as SuiteDecoratedMethod)?.suiteDecorator) {
    originalMethod.suiteDecorator.fail = reason || true;
    return;
  }

  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.fail = reason || true;
    return;
  }
}
