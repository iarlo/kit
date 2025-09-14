import chalk from 'chalk'

import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class SyncCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
    this.command.argument('[remote]', 'The remote to sync with', 'upstream')
  }

  async action(remote?: string) {
    logger.info(`Checking for remote ${chalk.bold(remote)}...`)
    const remotesOutput = await this.execute('git remote')
    if (remotesOutput === null) return logger.error(`No remotes found.`)

    const remotes = remotesOutput.split('\n')
    if (!remotes.includes(remote ?? '')) {
      logger.error(`Error: A remote named "${remote}" is not configured.`)
      logger.info(`You can add it by running: git remote add ${remote} <URL_TO_ORIGINAL_REPO>`)
      return
    }

    const currentBranch = await this.execute('git branch --show-current')
    if (currentBranch === null) return logger.error(`No branch found.`)

    const fetchOutput = await this.execute(`git fetch ${remote}`)
    if (fetchOutput === null) return logger.info(`Branch ${chalk.bold(currentBranch)} is already in sync with ${chalk.bold(remote)}.`)

    logger.info(`Rebasing ${chalk.bold(currentBranch)}...`)
    const rebaseOutput = await this.execute(`git rebase ${remote}/${currentBranch}`)
    if (rebaseOutput === null) return
    logger.info(rebaseOutput)

    logger.info(`Branch ${chalk.bold(currentBranch)} is now in sync with ${chalk.bold(remote)}.`)
  }
}

export default SyncCommand
