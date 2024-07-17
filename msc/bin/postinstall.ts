import path from "path";
import { promises as fs } from "fs";
import Log from "@utils";

const cwd = process.cwd();

const removeWildcards = (array: string[]) =>
  array.forEach((pattern, index) => {
    array[index] = pattern.replace(/\*/g, "");
  });
async function createCompilerFolder() {
  await fs.mkdir(path.join(cwd, ".msc"));
}

async function modifySettings() {
  try {
    const vscodeFolderPath = path.join(cwd, ".vscode");
    const vscodeFolder = await fs.readdir(vscodeFolderPath);
    if (vscodeFolder.includes("settings.json")) {
      const settingsFilePath = path.join(vscodeFolderPath, "settings.json");
      const settingsFileContent = await fs.readFile(settingsFilePath, "utf8");
      const settingsFile: SettingsFile = JSON.parse(settingsFileContent);
      const isConfigIncluded = settingsFile["json.schemas"].some((obj) => {
        removeWildcards(obj.fileMatch);
        if (obj.fileMatch.includes("msc.config.json")) return true;
        return false;
      });
      if (!isConfigIncluded) {
        settingsFile["json.schemas"].push({
          fileMatch: ["**/msc.config.json"],
          schema: {
            ref: "/.msc/schema/msc.config.schema.json",
          },
        });

        fs.writeFile(settingsFilePath, JSON.stringify(settingsFile, null, 2));
      }
    }
  } catch (error: any) {
    Log.error(`Error modifying settings file: ${error.message}`);
  }
}

(async function () {
  try {
    const schemaPath = path.join("./schema", "msc.config.schema.json");
    const configPath = path.join(cwd, "msc.config.json");
    const destPath = path.join(`${cwd}/.msc`, "schema");
    await fs.mkdir(destPath, { recursive: true });
    if (!(await fs.exists(configPath))) fs.writeFile(configPath, "{}");
    await fs.copyFile(
      schemaPath,
      path.join(destPath, "msc.config.schema.json")
    );
    await Promise.all([createCompilerFolder, modifySettings]);
    Log.info("postinstall complete.");
  } catch (error: any) {
    Log.error(`Error running postinstall: ${error.message}`);
  }
})();

interface SchemaObject {
  fileMatch: string[];
  schema: {
    ref: string;
  };
}

interface SettingsFile {
  "json.schemas": SchemaObject[];
}
