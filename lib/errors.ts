export class NotSuiteDecoratedMethodError extends Error {
  constructor(decoratorName: string ,method: any) {
    super(`${decoratorName} decorator can be applied only to methods decorated by @suite. ${method?.name} is not decorated by @suite`);
  }
}

export class NotTestDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: any) {
    super(`${decoratorName} decorator can be applied only to methods decorated by @test. ${method?.name} is not decorated by @test`);
  }
}

export class NotSuiteOrTestDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: any) {
    super(`${decoratorName} decorator can be applied only to methods decorated by @test or classes decorated by @suite. ${method?.name} is not decorated by any of them`);
  }
}
