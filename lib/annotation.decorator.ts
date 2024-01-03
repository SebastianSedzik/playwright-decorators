import { createTestDecorator } from './custom'

interface AnnotationDecoratorOptions {
  type: 'skip' | 'fail' | 'issue' | 'slow' | string
  description?: string
}

/**
 * Add custom annotation to a @test.
 * Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.
 */
export const annotation = (options: AnnotationDecoratorOptions) => createTestDecorator('annotation', ({ test }) => {
  test.annotations.push(options)
});
