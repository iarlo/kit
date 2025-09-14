import chalk from 'chalk'

import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class PruneCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
  }

  async action() {
    logger.info(`Fetching from ${chalk.bold('origin')} and pruning stale remote-tracking branches...`)
    const fetchOutput = await this.execute('git fetch origin --prune')
    if (fetchOutput) logger.info(fetchOutput)

    const branchOutput = await this.execute('git branch -v')
    if (branchOutput === null) return

    const branchesToDelete = branchOutput
      .split('\n')
      .filter(line => line.includes(': gone]'))
      .map(line => line.trim().split(' ')[0])

    if (branchesToDelete.length === 0) {
      logger.info('No local branches to prune. Everything is clean!')
      return
    }

    logger.info(`Found ${branchesToDelete.length} branches to prune: ${chalk.bold(branchesToDelete.join(', '))}`)

    const currentBranch = await this.execute('git branch --show-current')

    for (const branch of branchesToDelete) {
      if (branch === currentBranch) {
        logger.warn(`Skipping deletion of current branch: ${chalk.bold(branch)}`)
        continue
      }
      logger.info(`Deleting branch ${chalk.bold(branch)}...`)
      const deleteOutput = await this.execute(`git branch -d ${branch}`)
      if (deleteOutput) {
        logger.info(deleteOutput)
      }
    }
  }
}

export default PruneCommand
