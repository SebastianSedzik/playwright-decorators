import playwright, {expect} from "@playwright/test";
import {
  suite,
  test,
  createSuiteDecorator,
  createTestDecorator, NotTestDecoratedMethodError, NotSuiteDecoratedMethodError
} from '../lib';

playwright.describe('custom decorators', () => {
  playwright.describe('createSuiteDecorator', () => {
    const called: string[] = [];

    const customSuiteDecorator = createSuiteDecorator('customSuiteDecorator', () => {
      called.push('customSuiteDecorator');
    });

    @customSuiteDecorator
    @suite()
    class CustomSuiteDecoratorSuite {
      @test()
      customTest() {
        called.push('test#1');
      }
      
      @test()
      customTest2() {
        called.push('test#2');
      }
    }

    @suite()
    class SuiteWithoutCustomSuiteDecorator {
      @test()
      customTest() {
        called.push('test#2');
      }
    }

    playwright('Should customSuiteDecorator be called before all tests', () => {
      expect(called.join('->')).toContain('customSuiteDecorator->test#1->test#2');
    });

    playwright('Should customSuiteDecorator not be called on non decorated suite', () => {
      expect(called.join('->')).not.toContain('customSuiteDecorator->test#2');
    });

    playwright('Should call customSuiteDecorator once', () => {
      const customSuiteDecoratorsCalls = called.filter((item) => item === 'customSuiteDecorator');
      expect(customSuiteDecoratorsCalls.length).toEqual(1);
    });

    playwright('Should throw error if decorator is not used on @suite', () => {
      expect(() => {
        @customSuiteDecorator
        class ExampleClass {}
      }).toThrowError(NotSuiteDecoratedMethodError)
    });
  })
  
  playwright.describe('createTestDecorator', () => {
    const called: string[] = [];

    const customTestDecorator = createTestDecorator('customTestDecorator', ({ test }) => {
      test.beforeTest(() => { called.push('beforeTestHook') });
      test.afterTest(() => { called.push('afterTestHook') });
    });
    
    @suite()
    class CustomTestDecoratorSuite {
      @customTestDecorator
      @test()
      testWithCustomTestDecorator() {
        called.push('testWithCustomTestDecorator');
      }
      
      @test()
      testWithoutCustomTestDecorator() {
        called.push('testWithoutCustomTestDecorator');
      }
    }
    
    playwright('Should `beforeTestHook` be called before test code', () => {
      expect(called.join('->')).toContain('beforeTestHook->testWithCustomTestDecorator');
    });
    
    playwright('Should `afterTestHook` be called after test code', () => {
      expect(called.join('->')).toContain('testWithCustomTestDecorator->afterTestHook');
    });
    
    playwright('Should `beforeTestHook` & `afterTestHook` be called once', () => {
      expect(called.filter((item) => item === 'beforeTestHook').length).toEqual(1);
      expect(called.filter((item) => item === 'afterTestHook').length).toEqual(1);
    });

    playwright('Should `beforeTestHook` & `afterTestHook` not be called on non decorated test', () => {
      expect(called.join('->')).not.toContain('beforeTestHook->testWithoutCustomTestDecorator');
      expect(called.join('->')).not.toContain('testWithoutCustomTestDecorator->afterTestHook');
    })

    playwright('Should throw error if decorator is not used on @test', () => {
      expect(() => {
        @customTestDecorator
        class ExampleClass {}
      }).toThrowError(NotTestDecoratedMethodError)
    });
  })
});
