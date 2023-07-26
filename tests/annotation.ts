import playwright, {expect} from "@playwright/test";
import {suite, test, annotation} from "../lib";

playwright.describe('@annotate decorator', () => {
  playwright.describe('with @test', () => {
    const setAnnotations: {type: string, description?: any}[] = [];

    @suite()
    class FocusedSuite {
      @annotation({ type: 'issue', description: 'url to issue' })
      @test()
      testWithCustomAnnotation() {
        setAnnotations.push(...playwright.info().annotations);
      }
    }

    playwright('@annotation decorator should add entry to playwright.info().annotations', () => {
      expect(setAnnotations).toEqual(expect.arrayContaining([{type: 'issue', description: 'url to issue'}]));
    });
  });
});
