import chalk from 'chalk'

import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class BranchCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
    // this.command.option('-r, --remove <name>', 'Remove a branch')
    this.command.argument('[name]', 'Branch name to checkout or create')
  }

  async action(str?: string) {
    const options = this.command.opts()
    const currentBranch = await this.getCurrentBranch()
    if (!currentBranch) return

    if (!Object.keys(options).length && !str) return logger.info(`Current branch: ${chalk.bold(currentBranch)}`)
    if (str === currentBranch) return logger.info(`Already on ${chalk.bold(str)}`)

    const output = await this.execute([`git checkout ${str}`, `git checkout -b ${str}`], ['Switched to branch', 'Created branch'])

    logger.info(`${output}${chalk.bold(str)}`)
  }
}

export default BranchCommand
