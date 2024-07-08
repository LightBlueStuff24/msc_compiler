import path from "path";
import { promises as fs } from "fs";
import { Log } from "../src/utilities";

interface SchemaObject {
  fileMatch: string[];
  schema: {
    ref: string;
  };
};

interface SettingsFile {
  "json.schemas": SchemaObject[];
}


async function modifySettings(projectPath: string) {
  try {
    const vscodeFolderPath = path.join(projectPath, ".vscode");
    const vscodeFolder = await fs.readdir(vscodeFolderPath);
    if (vscodeFolder.includes("settings.json")) {
      const settingsFilePath = path.join(vscodeFolderPath, "settings.json");
      const settingsFileContent = await fs.readFile(settingsFilePath, "utf8");
      const settingsFile: SettingsFile = JSON.parse(settingsFileContent);
      const isConfigIncluded = settingsFile["json.schemas"].some((obj) => {
        removeWildcards(obj.fileMatch);
        if (obj.fileMatch.includes('msc.config.json')) return true;
        return false
      });
      if (!isConfigIncluded) {
        settingsFile["json.schemas"].push({
          fileMatch: ["**/msc.config.json"],
          schema: {
            ref: "/schema/msc.config.schema.json",
          },
        });

        fs.writeFile(
          settingsFilePath,
          JSON.stringify(settingsFile, null, 2)
        );
      }
    }
  } catch (error: any) {
    Log.error(`Error modifying settings file: ${error.message}`);
  }
}

function removeWildcards(array: string[]) {
  array.forEach((pattern, index) => {
    array[index] = pattern.replace(/\*/g, "");
  });
}


(async function () {
  try {
    const schemaPath = path.join("./", "schema", "msc.config.schema.json");
    const userProjectPath = process.cwd();
    const configPath = path.join(userProjectPath, "msc.config.json");
    const destPath = path.join(userProjectPath, "schema");
    await fs.mkdir(destPath, { recursive: true });
    if (!(await fs.readFile(configPath))) fs.writeFile(configPath, "{}");
    await fs.copyFile(
      schemaPath,
      path.join(destPath, "msc.config.schema.json")
    );
    await modifySettings(userProjectPath);
    Log.info("Configuration schema file copied to your project.");
  } catch (error: any) {
    Log.error(`Error copying configuration schema file: ${error.message}`);
  }
})()