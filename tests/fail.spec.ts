import playwright, {expect} from "@playwright/test";
import {suite, test, fail} from "../lib";

playwright.describe('@fail decorator', () => {
  playwright.describe('with @test', () => {
    const called: string[] = [];
    
    @suite()
    class FocusedSuite {
      @fail()
      @test()
      failingTest() {
        called.push('failingTest');
        expect(true).toBe(false);
      }
    }

    playwright('@fail decorator should not throw error when test fails', () => {
      // is called and not throw error
      expect(called).toEqual(['failingTest']);
    });
  });
});
