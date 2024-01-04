/**
 * Public API Surface of playwright-decorators
 */

// base
export { suite } from './suite.decorator'
export { test } from './test.decorator'

// hooks
export { beforeAll } from './beforeAll.decorator'
export { beforeEach } from './beforeEach.decorator'
export { afterAll } from './afterAll.decorator'
export { afterEach } from './afterEach.decorator'

// annotations
export { skip } from './skip.decorator'
export { slow } from './slow.decorator'
export { fail } from './fail.decorator'
export { fixme } from './fixme.decorator'
export { only } from './only.decorator'
export { annotation } from './annotation.decorator'
export { tag } from './tag.decorator'

// helpers
export { debug } from './debug.decorator'

// common
export { type TestInfo, type TestArgs } from './common'

// custom
export { createSuiteDecorator, createTestDecorator, createSuiteAndTestDecorator } from './custom'
