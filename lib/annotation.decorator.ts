import {isTestDecoratedMethod} from "./test.decorator";
import {NotTestDecoratedMethodError} from "./errors";

interface AnnotationDecoratorOptions {
  type: 'skip' | 'fail' | 'issue' | 'slow' | string;
  description?: string;
}

/**
 * Add custom annotation to a @test.
 * Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.
 */
export const annotation = (options: AnnotationDecoratorOptions) => function(originalMethod: any, context?: any) {
  if (isTestDecoratedMethod(originalMethod)) {
    originalMethod.testDecorator.annotations.push(options);
  } else {
    throw new NotTestDecoratedMethodError('annotation', originalMethod);
  }
}