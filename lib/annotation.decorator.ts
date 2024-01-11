import { createTestDecorator } from './custom'
import playwright from '@playwright/test'

interface AnnotationDecoratorOptions {
  type: 'skip' | 'fail' | 'issue' | 'slow' | string
  description?: string
}

/**
 * Add custom annotation to a @test.
 * Annotations are accessible via test.info().annotations. Many reporters show annotations, for example 'html'.
 */
export const annotation = (options: AnnotationDecoratorOptions) =>
  createTestDecorator('annotation', ({ test }) => {
    test.beforeTest(() => {
      playwright.info().annotations.push(options)
    })
  })
