import { readFileSync } from 'node:fs'

import { logger } from '../../util/logger'
import { tryCatch } from '../../util/tryCatch'
import CommandFactory from '../common/factory'

class VersionCommand extends CommandFactory {
  async action() {
    const kisVersion = await this.getVersion()
    const output = await this.execute('git -v')
    logger.info(`kit version ${kisVersion} / ${output}`)
  }

  // TODO fix this shit
  private async getVersion(): Promise<string> {
    const { data } = await tryCatch<Record<string, string>>(JSON.parse(readFileSync('./package.json', 'utf-8')))
    return data?.version ?? 'Unable to get kit version'
  }
}

export default VersionCommand
