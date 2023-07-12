import playwright from '@playwright/test';

interface TestDecoratorOptions {
  /**
   * Name of the test. Default: name of the method
   */
  name?: string;
}

class TestDecorator implements TestDecoratorOptions {
  name: string;

  constructor(private testMethod: any, options: TestDecoratorOptions) {
    this.name = testMethod.name;
    
    Object.assign(this, options);
  }

  run(executionContext: any) {
    // playwright function do not accept ...rest arguments, so we need to request all of them and pass to the testMethod manually
    playwright(this.name, ({playwright, context, browserName, browser, contextOptions, connectOptions, page, testIdAttribute, launchOptions, defaultBrowserType, baseURL, channel, acceptDownloads, bypassCSP, deviceScaleFactor, extraHTTPHeaders, httpCredentials, ignoreHTTPSErrors, geolocation, hasTouch, headless, isMobile, javaScriptEnabled, locale, navigationTimeout, actionTimeout, offline, permissions, proxy, request, serviceWorkers, screenshot, trace, storageState, timezoneId, video, viewport, userAgent, colorScheme
                           }, ...args) => {
      return this.testMethod.call(executionContext, {playwright, context, browserName, browser, contextOptions, connectOptions, page, testIdAttribute, launchOptions, defaultBrowserType, baseURL, channel, acceptDownloads, bypassCSP, deviceScaleFactor, extraHTTPHeaders, httpCredentials, ignoreHTTPSErrors, geolocation, hasTouch, headless, isMobile, javaScriptEnabled, locale, navigationTimeout, actionTimeout, offline, permissions, proxy, request, serviceWorkers, screenshot, trace, storageState, timezoneId, video, viewport, userAgent, colorScheme}, ...args);
    })
  }
}

export type TestDecoratedMethod = { testDecorator: TestDecorator };

/**
 * Mark method as test.
 * Method class should be marked with @suite decorator
 */
export const test = (options: TestDecoratorOptions = {}) => function(originalMethod: any, context: any) {
  const testDecorator = new TestDecorator(originalMethod, options);

  Object.assign(originalMethod, { testDecorator });

  (context as ClassMemberDecoratorContext ).addInitializer(function () {
    testDecorator.run(this);
  });
}
