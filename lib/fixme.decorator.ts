import {SuiteDecoratedMethod} from "./suite.decorator";
import {TestDecoratedMethod} from "./test.decorator";

/**
 * Marks a @test or @suite as "fixme", with the intention to fix (with optional reason).
 * Decorated tests or suites will not be run.
 */
export const fixme = (reason?: string) => function(originalMethod: any, context?: any) {
  if ((originalMethod as SuiteDecoratedMethod)?.suiteDecorator) {
    originalMethod.suiteDecorator.fixme = reason || true;
    return;
  }
  
  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.fixme = reason || true;
    return;
  }
}
