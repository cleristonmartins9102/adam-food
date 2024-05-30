import chalk from 'chalk'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ChalkAdapter {
  static say (text: string, color: ChalkAdapter.Colors): void {
    const message = chalk[color](text)
    process.stdout.write(message)
  }
}

export namespace ChalkAdapter {
  export enum Colors {
    red = 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow',
    white = 'white'
  }
}
