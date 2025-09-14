import { LogLevel, LogLevelIcons } from './enums'

class Logger {
  private readonly stderr = process.stderr
  private readonly stdout = process.stdout

  debug = (message: string) => this.log(LogLevel.DEBUG, message)
  error = (message: string) => this.log(LogLevel.ERROR, message)
  fatal = (message: string) => this.log(LogLevel.FATAL, message)
  info = (message: string) => this.log(LogLevel.INFO, message)
  warn = (message: string) => this.log(LogLevel.WARN, message)

  private log(level: LogLevel, message: string) {
    const icon = LogLevelIcons[LogLevel[level] as keyof typeof LogLevelIcons];
    (level > 2 ? this.stderr : this.stdout).write(`${icon}  ${message}\n`)
  }
}

export default Logger
