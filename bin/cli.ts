import {program} from 'commander'
import {Build,Init,WatchFile,Rebuild} from './msc_main'


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
  .command('rc')
  .description('Recompiles your edited files only.')
  .action(Rebuild)

program
  .command('watch')
  .description('Starts watching files for changes in current directory.')
  .action(WatchFile)

program.parse(process.argv)