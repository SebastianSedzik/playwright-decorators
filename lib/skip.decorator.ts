import { createSuiteAndTestDecorator } from './custom';

/**
 * Skip @test or @suite (with optional reason).
 */
export const skip = (reason?: string) => createSuiteAndTestDecorator('skip', ({ suite }) => {
  suite.skip = reason || true
}, ({ test }) => {
  test.skip = reason || true
});
