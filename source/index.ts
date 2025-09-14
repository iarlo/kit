import { program } from 'commander'

import BranchCommand from './commands/branch'
import CommandFactory from './commands/common/factory'
import DeleteCommand from './commands/delete'
import FeatureCommand from './commands/feature'
import FixupCommand from './commands/fixup'
import InitCommand from './commands/init'
import StatusCommand from './commands/internal/status'
import VersionCommand from './commands/internal/version'
import PruneCommand from './commands/prune'
import RewordCommand from './commands/reword'
import SyncCommand from './commands/sync'
import UndoCommand from './commands/undo'
import { logger } from './util/logger'

class CLI {
  commands: CommandFactory[]
  program = program
  constructor() {
    this.program.name('kit').description('My Node CLI')
    this.commands = [
      new InitCommand('init', 'init', 'start'),
      new BranchCommand('branch', 'branch', 'br'),
      new DeleteCommand('delete', 'Delete a branch', 'del'),
      new FeatureCommand('feature', 'Create a new feature branch', 'feat'),
      new FixupCommand('fixup', 'Add staged changes to the previous commit', 'fu'),
      new PruneCommand('prune', 'Prune local branches whose upstream has been deleted'),
      new SyncCommand('sync', 'Sync a branch with the upstream remote'),
      new UndoCommand('undo', 'Undo the last commit (soft reets)'),
      new RewordCommand('reword', 'Change the message of the previous commit', 'rw'),
      new StatusCommand('status', 'status', 'st'),
      new VersionCommand('version', 'version'),
    ]
    this.configure()
  }

  configure() {
    this.program.configureOutput({
      outputError: str => logger.error(str.trim()),
      writeErr: str => logger.error(str.trim()),
      writeOut: str => logger.info(str.trim()),
    })
    this.commands.forEach((command) => {
      this.program.addCommand(command.command)
    })
  }

  run(args: string[]) {
    this.program.parse(args)
  }
}

new CLI().run(process.argv)
