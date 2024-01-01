export class NotSuiteDecoratedMethodError extends Error {
  constructor(decoratorName: string ,method: any) {
    super(`
The @${decoratorName} decorator can only be used on class that also have the @suite decorator.
Make sure ${method?.name} is marked with @suite, and that ${decoratorName} comes before @suite, like this:

@${decoratorName}
@suite()
${method?.name}() {}`);
  }
}

export class NotTestDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: any) {
    super(`
The @${decoratorName} decorator can only be used on methods that also have the @test decorator.
Make sure ${method?.name} is marked with @test, and that ${decoratorName} comes before @test, like this:

@${decoratorName}
@test()
${method?.name}() {}`
    );
  }
}

export class NotSuiteOrTestDecoratedMethodError extends Error {
  constructor(decoratorName: string, method: any) {
    super(`
The @${decoratorName} decorator can only be used on classes/methods that also have the @suite or @test decorator.
Make sure ${method?.name} is marked with @suite or @test, and that ${decoratorName} comes before @suite or @test, like this:

@${decoratorName}
@suite() / @test()
${method?.name}() {}
    `);
  }
}
