import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class FeatureCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
    this.command
      .argument('<name>', 'Name of the new feature branch')
      .option('-f, --from <branch>', 'The source branch to pull from', 'main')
  }

  async action(str?: string) {
    const options = this.command.opts()
    const sourceBranch = options.from

    const checkoutOutput = await this.execute(`git checkout ${sourceBranch}`)
    if (!checkoutOutput) return logger.error(`Could not checkout ${sourceBranch}`)

    const pullOutput = await this.execute('git pull')
    if (!pullOutput) return logger.error(`Could not pull from ${sourceBranch}`)

    const createOutput = await this.execute(`git checkout -b ${str}`)
    if (createOutput === null) return logger.error(`Could not create feature branch ${str}`)

    logger.info(`Successfully created feature branch '${str}' from '${sourceBranch}'`)
  }
}

export default FeatureCommand
