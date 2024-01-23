import {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestInfo as PlaywrightTestInfo,
  TestType as PlaywrightTestType
} from '@playwright/test'

export type TestInfo = PlaywrightTestInfo
export type TestArgs<T = unknown> = T &
  PlaywrightTestArgs &
  PlaywrightTestOptions &
  PlaywrightWorkerArgs &
  PlaywrightWorkerOptions
export type TestMethod<T = any> = (args: TestArgs<T>, testInfo: TestInfo) => void | Promise<void>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TestClass = { new (...args: any[]): any }
export type TestType<T = any> = PlaywrightTestType<
  TestArgs & T,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
>
