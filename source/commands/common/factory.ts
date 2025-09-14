import { Command } from 'commander'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import errors from '../../../resources/error.json'
import { logger } from '../../util/logger'
import { ExecErrorOutput, tryCatch } from '../../util/tryCatch'

abstract class CommandFactory {
  public command: Command
  readonly exec = promisify(exec)
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    this.command = new Command(name)
    this.command.description(description)
    this.command.action(this.action.bind(this))
    if (alias) this.command.alias(alias)
  }

  abstract action(): Promise<void> | void

  async execute<T extends string | string[]>(command: T, message?: T): Promise<null | string> {
    if (Array.isArray(command)) {
      for (const [index, cmd] of command.entries()) {
        const { data, error } = await tryCatch(this.exec(cmd))
        if (error) continue
        return `${(message && message[index]) ?? ''} ${data.stdout.trim()}`
      }
      logger.error('None of the commands in the array succeeded.')
      return null
    }

    try {
      const { stderr, stdout } = await this.exec(command)
      const output = stdout.trim() || stderr.trim()
      return `${message ?? ''}${output}`
    }
    catch (error) {
      const execError = error as ExecErrorOutput
      const msg = errors[execError.cmd as never] ?? execError.stderr?.trim() ?? execError.message.trim()
      logger.error(msg)
      return null
    }
  }

  protected async getCurrentBranch(): Promise<null | string> {
    return this.execute('git branch --show-current')
  }
}

export default CommandFactory
