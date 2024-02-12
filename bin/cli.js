const program = require('commander').program;
const {startBuild,watchFiles} = require('./msc-main');
// Define the commands and their descriptions
program.helpCommand(true);

program
  .command('watch [directory]')
  .description('Starts watching files for changes in current directory')
  .action(watchFiles);

program
  .command('build [target] [outputDir]')
  .description('Builds your project into a mcaddon to use in Minecraft')
  .action(startBuild);

program.parse(process.argv);



