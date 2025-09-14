import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class RewordCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
    this.command.argument('<message>', 'The new commit message')
  }

  async action(str?: string) {
    logger.info('Changing the message of the last commit...')
    const amendOutput = await this.execute(`git commit --amend -m "${str}"`)
    if (amendOutput === null) return logger.info('No commits to reword.')
    logger.info(amendOutput)
  }
}

export default RewordCommand
