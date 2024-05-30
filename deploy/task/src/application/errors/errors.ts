export class CustomError extends Error {
  parameters: string[] = []
  throw (param: string): void {
    this.parameters.push(param)
  }

  serialize (): { error: string, parameters: string [] } {
    return {
      error: this.message,
      parameters: this.parameters
    }
  }
}

export class MissingParamError extends CustomError {
  constructor () {
    super('Missing param error')
  }
}
