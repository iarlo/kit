import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class FixupCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
  }

  async action() {
    logger.info('Amending previous commit with staged changes...')
    const amendOutput = await this.execute('git commit --amend --no-edit')
    if (amendOutput === null) return logger.info('No commits to fixup.')

    logger.info('Successfully added changes to the last commit.')
    logger.info(amendOutput)
  }
}

export default FixupCommand
