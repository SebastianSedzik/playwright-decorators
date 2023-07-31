import {isSuiteDecoratedMethod} from "./suite.decorator";
import {isTestDecoratedMethod} from "./test.decorator";
import {NotSuiteOrTestDecoratedMethodError} from "./errors";

/**
 * Marks a @test or @suite as "slow" (with optional reason).
 * Slow test will be given triple the default timeout.
 */
export const slow = (reason?: string) => function(originalMethod: any, context?: any) {
  if (isSuiteDecoratedMethod(originalMethod)) {
    originalMethod.suiteDecorator.slow = reason || true;
    return;
  }
  
  if (isTestDecoratedMethod(originalMethod)) {
    originalMethod.testDecorator.slow = reason || true;
    return;
  }
  
  throw new NotSuiteOrTestDecoratedMethodError('slow', originalMethod);
}
