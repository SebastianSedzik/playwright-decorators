import {TestDecoratedMethod} from "./test.decorator";

interface AnnotationDecoratorOptions {
  type: 'skip' | 'fail' | 'issue' | 'slow' | string;
  description?: string;
}

/**
 * Add custom annotation to a @test.
 * Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.
 */
export const annotation = (options: AnnotationDecoratorOptions) => function(originalMethod: any, context?: any) {
  if ((originalMethod as TestDecoratedMethod)?.testDecorator) {
    originalMethod.testDecorator.annotations.push(options);
    return;
  }
}
