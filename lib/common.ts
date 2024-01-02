import {PlaywrightTestArgs, TestInfo, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions} from "@playwright/test";

export { TestInfo } from "@playwright/test";
export type TestArgs = PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions;
export type TestMethod = (args: TestArgs, testInfo: TestInfo) => void | Promise<void>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TestClass = { new(...args: any[]): any };
