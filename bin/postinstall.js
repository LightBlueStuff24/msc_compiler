const path = require('path');
const fs = require('fs').promises;
const { BuildLog } = require('../utilities/buildLog');
async function copySchema() {
  try {
    const schemaPath = path.join('./', 'schema', 'msc.config.schema.json');
    const userProjectPath = process.cwd();
    const configPath = path.join(userProjectPath, 'msc.config.json')
    const destPath = path.join(userProjectPath, 'schema');
    await fs.mkdir(destPath, { recursive: true });
    if (!(await fs.readFile(configPath))) await fs.writeFile(configPath, "{}");
    await fs.copyFile(schemaPath, path.join(destPath, 'msc.config.schema.json'));
    await modifySettings(userProjectPath);
    BuildLog.info('Configuration schema file copied to your project.');
  } catch (error) {
    BuildLog.error('Error copying configuration schema file:', error.message);
  }
}

async function modifySettings(projectPath) {
  try {
    const vscodeFolderPath = path.join(projectPath, '.vscode');
    const vscodeFolder = await fs?.readdir(vscodeFolderPath) ?? await fs?.readdir(fs?.mkdir(vscodeFolderPath));
    if (vscodeFolder.includes('settings.json')) {
      const settingsFilePath = path.join(vscodeFolderPath, 'settings.json');
      const settingsFileContent = await fs.readFile(settingsFilePath, 'utf8');
      const settingsFile = JSON.parse(settingsFileContent);
      if (!settingsFile["json.schemas"] || !settingsFile["json.schemas"].some(obj => obj.fileMatch[0].includes('msc.config.json'))) {
        if (!settingsFile["json.schemas"]) {
          settingsFile["json.schemas"] = [];
        }

        settingsFile["json.schemas"].push({
          "fileMatch": ["/*msc.config.json"],
          "schema": {
            "ref": "/schema/msc.config.schema.json"
          }
        });

        await fs.writeFile(settingsFilePath, JSON.stringify(settingsFile, null, 2));
      }
    }
  } catch (error) {
    BuildLog.error('Error modifying settings file:', error.message);
  }
}

copySchema();
