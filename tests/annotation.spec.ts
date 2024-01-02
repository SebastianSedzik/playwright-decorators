import playwright, { expect } from '@playwright/test'
import { suite, test, annotation } from '../lib'
import { NotTestDecoratedMethodError } from '../lib/errors'

playwright.describe('@annotate decorator', () => {
  playwright.describe('with @test', () => {
    const setAnnotations: { type: string; description?: any }[] = []

    @suite()
    class AnnotatedSuite {
      @annotation({ type: 'issue', description: 'url to issue' })
      @test()
      testWithCustomAnnotation() {
        setAnnotations.push(...playwright.info().annotations)
      }
    }

    playwright('@annotation decorator should add entry to playwright.info().annotations', () => {
      expect(setAnnotations).toEqual(
        expect.arrayContaining([{ type: 'issue', description: 'url to issue' }])
      )
    })
  })

  playwright.describe('without @test', () => {
    playwright('should throw NotTestDecoratedMethodError', () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        @annotation({ type: 'issue', description: 'url to issue' })
        class ExampleClass {}
      } catch (e) {
        playwright.expect(e instanceof NotTestDecoratedMethodError).toBeTruthy()
      }
    })
  })
})
