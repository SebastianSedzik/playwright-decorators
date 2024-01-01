import {isTestDecoratedMethod} from "./test.decorator";
import {NotTestDecoratedMethodError} from "./errors";
import {TestMethod} from "./common";

interface AnnotationDecoratorOptions {
  type: 'skip' | 'fail' | 'issue' | 'slow' | string;
  description?: string;
}

/**
 * Add custom annotation to a @test.
 * Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.
 */
export const annotation = (options: AnnotationDecoratorOptions) => function(
  originalMethod: TestMethod,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: ClassMethodDecoratorContext
) {
  if (isTestDecoratedMethod(originalMethod)) {
    originalMethod.testDecorator.annotations.push(options);
  } else {
    throw new NotTestDecoratedMethodError('annotation', originalMethod);
  }
}
