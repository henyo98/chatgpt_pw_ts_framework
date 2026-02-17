// logger.ts
import chalk from 'chalk'
import type { TestInfo } from '@playwright/test'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

class Logger {
  private level: LogLevel = 'debug'

  private shouldLog(level: LogLevel) {
    const order: LogLevel[] = ['debug', 'info', 'warn', 'error']
    return order.indexOf(level) >= order.indexOf(this.level)
  }

  setLevel(level: LogLevel) {
    this.level = level
  }

  private formatMeta(meta?: unknown) {
    if (!meta) return ''
    return '\n' + JSON.stringify(meta, null, 2)
  }

  private attachToReport(
    testInfo: TestInfo | undefined,
    level: LogLevel,
    message: string,
    meta?: unknown
  ) {
    if (!testInfo) return

    const body =
      `[${level.toUpperCase()}] ${message}` +
      (meta ? '\n' + JSON.stringify(meta, null, 2) : '')

    testInfo.attach(`log-${level}`, {
      body,
      contentType: 'text/plain',
    })
  }

  debug(message: string, meta?: unknown, testInfo?: TestInfo) {
    if (!this.shouldLog('debug')) return

    console.log(
      chalk.cyan.bold('[DEBUG]'),
      chalk.cyan(message),
      meta ? '\n' + chalk.gray(JSON.stringify(meta, null, 2)) : ''
    )

    this.attachToReport(testInfo, 'debug', message, meta)
  }

  info(message: string, meta?: unknown, testInfo?: TestInfo) {
    if (!this.shouldLog('info')) return

    console.log(
      chalk.green.bold('[INFO]'),
      chalk.green(message),
      meta ? '\n' + chalk.gray(JSON.stringify(meta, null, 2)) : ''
    )

    this.attachToReport(testInfo, 'info', message, meta)
  }

  warn(message: string, meta?: unknown, testInfo?: TestInfo) {
    if (!this.shouldLog('warn')) return

    console.warn(
      chalk.yellow.bold('[WARN]'),
      chalk.yellow(message),
      meta ? '\n' + chalk.gray(JSON.stringify(meta, null, 2)) : ''
    )

    this.attachToReport(testInfo, 'warn', message, meta)
  }

  error(message: string, meta?: unknown, testInfo?: TestInfo) {
    if (!this.shouldLog('error')) return

    console.error(
      chalk.red.bold('[ERROR]'),
      chalk.red(message),
      meta ? '\n' + chalk.gray(JSON.stringify(meta, null, 2)) : ''
    )

    this.attachToReport(testInfo, 'error', message, meta)
  }
}

export const logger = new Logger()

// // old logger.ts
// import chalk from 'chalk'

// export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// class Logger {
//   private level: LogLevel = 'debug'

//   private shouldLog(level: LogLevel) {
//     const order: LogLevel[] = ['debug', 'info', 'warn', 'error']
//     return order.indexOf(level) >= order.indexOf(this.level)
//   }

//   setLevel(level: LogLevel) {
//     this.level = level
//   }

//   private formatMeta(meta?: unknown) {
//     if (!meta) return ''
//     return '\n' + chalk.gray(JSON.stringify(meta, null, 2))
//   }

//   debug(message: string, meta?: unknown) {
//     if (!this.shouldLog('debug')) return
//     console.log(
//       chalk.cyan.bold('[DEBUG]'),
//       chalk.cyan(message),
//       this.formatMeta(meta)
//     )
//   }

//   info(message: string, meta?: unknown) {
//     if (!this.shouldLog('info')) return
//     console.log(
//       chalk.green.bold('[INFO]'),
//       chalk.green(message),
//       this.formatMeta(meta)
//     )
//   }

//   warn(message: string, meta?: unknown) {
//     if (!this.shouldLog('warn')) return
//     console.warn(
//       chalk.yellow.bold('[WARN]'),
//       chalk.yellow(message),
//       this.formatMeta(meta)
//     )
//   }

//   error(message: string, meta?: unknown) {
//     if (!this.shouldLog('error')) return
//     console.error(
//       chalk.red.bold('[ERROR]'),
//       chalk.red(message),
//       this.formatMeta(meta)
//     )
//   }
// }

// export const logger = new Logger()
