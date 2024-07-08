import { program } from "commander";
import { Build, Init, Watcher, UpdateSchema } from "./commands";

program.helpCommand(true);

program
  .command("init")
  .description("Creates a new project for your Add-on.")
  .action(Init);

program
  .command("update-schemas")
  .description("Updates the schemas that msc uses in validating and compiling your Add-on")
  .action(UpdateSchema);

program
  .command("build")
  .description("Compiles your project down into actual Add-on files.")
  .action(Build);
/**
 * Implement later
program
  .command('recompile')
  .description('Recompiles your edited files only.')
  .action(Rebuild)
*/

program
  .command("watch")
  .description("Starts watching files for changes in current directory.")
  .action(WatchFile);

program.parse(process.argv);
