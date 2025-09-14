import chalk from 'chalk'

import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class DeleteCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
    this.command.argument('<name>', 'Target branch to delete')
  }

  async action(str?: string) {
    const currentBranch = await this.getCurrentBranch()
    if (currentBranch === str) {
      return logger.error(`You cannot delete the current branch: ${chalk.bold(str)}`)
    }

    const output = await this.execute(`git branch -d ${str}`)
    if (output) {
      logger.info(output.trim())
    }
  }
}

export default DeleteCommand
