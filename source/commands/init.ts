import { logger } from '../util/logger'
import CommandFactory from './common/factory'

class InitCommand extends CommandFactory {
  async action() {
    const output = await this.execute('git init')
    if (output) logger.info(output)
  }
}

export default InitCommand
