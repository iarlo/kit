import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class UndoCommand extends CommandFactory {
  constructor(readonly name: string, readonly description: string, readonly alias?: string) {
    super(name, description, alias)
  }

  async action() {
    logger.info('Undoing the last commit (soft reset)...')

    const undoOutput = await this.execute('git reset --soft HEAD~1')
    if (undoOutput === null) return logger.info('No commits to undo.')

    logger.info(undoOutput)
    logger.info('Last commit has been undone.')
    logger.info('Your changes have been moved back to the staging area, ready to be modified or re-committed.')
  }
}

export default UndoCommand
