// logger.ts
import chalk from 'chalk'

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
    return '\n' + chalk.gray(JSON.stringify(meta, null, 2))
  }

  debug(message: string, meta?: unknown) {
    if (!this.shouldLog('debug')) return
    console.log(
      chalk.cyan.bold('[DEBUG]'),
      chalk.cyan(message),
      this.formatMeta(meta)
    )
  }

  info(message: string, meta?: unknown) {
    if (!this.shouldLog('info')) return
    console.log(
      chalk.green.bold('[INFO]'),
      chalk.green(message),
      this.formatMeta(meta)
    )
  }

  warn(message: string, meta?: unknown) {
    if (!this.shouldLog('warn')) return
    console.warn(
      chalk.yellow.bold('[WARN]'),
      chalk.yellow(message),
      this.formatMeta(meta)
    )
  }

  error(message: string, meta?: unknown) {
    if (!this.shouldLog('error')) return
    console.error(
      chalk.red.bold('[ERROR]'),
      chalk.red(message),
      this.formatMeta(meta)
    )
  }
}

export const logger = new Logger()
