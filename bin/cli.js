const program = require('commander').program;
const {startBuild} = require('./msc-api')
program
    .command('build')
    .description('Builds your project')
    .action(() => {
       startBuild()
    });

program.parse(process.argv);
