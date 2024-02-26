import {program} from 'commander'
import {Init, Build, WatchFile, ReBuild } from './msc_main'

program.helpCommand(true)

program
  .command('init')
  .description('Creates a new project for your Add-on.')
  .action(Init)

program
  .command('build')
  .description('Compiles your project down into actual Add-on files.')
  .action(Build)

program
  .command('recompile')
  .description('Recompiles your edited files only.')
  .action(ReBuild)

program
  .command('watch')
  .description('Starts watching files for changes in current directory.')
  .action(WatchFile)

program.parse(process.argv)