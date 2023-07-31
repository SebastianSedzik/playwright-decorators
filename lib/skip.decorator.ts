import {isSuiteDecoratedMethod} from "./suite.decorator";
import {isTestDecoratedMethod} from "./test.decorator";
import {NotSuiteOrTestDecoratedMethodError} from "./errors";

/**
 * Skip @test or @suite (with optional reason).
 */
export const skip = (reason?: string) => function(originalMethod: any, context?: any) {
  if (isSuiteDecoratedMethod(originalMethod)) {
    originalMethod.suiteDecorator.skip = reason || true;
    return;
  }

  if (isTestDecoratedMethod(originalMethod)) {
    originalMethod.testDecorator.skip = reason || true;
    return;
  }
  
  throw new NotSuiteOrTestDecoratedMethodError('skip', originalMethod);
}
