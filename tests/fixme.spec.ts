import playwright, {expect} from "@playwright/test";
import {suite, test, slow, beforeAll, skip, fixme} from "../lib";

playwright.describe('@fixme decorator', () => {
  playwright.describe('with @suite', () => {
    const called: string[] = [];

    @fixme()
    @suite()
    class SkipSuite {
      @test()
      async test() {
        called.push('test');
      }
      
      @test()
      async test2() {
        called.push('test2');
      }
    }
    
    playwright('@fixme decorator should not call any @test methods from suite', () => {
      expect(called).toEqual([]);
    });
  });

  playwright.describe('with @test', () => {
    const called: string[] = [];

    @suite()
    class TestSuite {
      @test()
      async test() {
        called.push('test');
      }

      @fixme()
      @test()
      async fixmeTest() {
        called.push('fixmeTest');
      }
      
      @test()
      async test2() {
        called.push('test2');
      }
    }
    
    playwright('@fixme decorator should not execute @test method', () => {
      expect(called).not.toContain('fixmeTest');
    })
  });
});