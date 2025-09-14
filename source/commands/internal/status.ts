import { logger } from '../../util/logger'
import CommandFactory from '../common/factory'

class StatusCommand extends CommandFactory {
  async action() {
    const output = await this.execute('git status')
    logger.info(output ?? '')
  }
}

export default StatusCommand
