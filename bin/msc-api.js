const { BuildLog } = require('./buildLog');
const axios = require('axios')
const { promises: fsPromise, existsSync, readFileSync } = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid')
const semver = require('semver')
const { EntityRegistry, FluidRegistry, ItemRegistry, BlockRegistry } = require('../src/registries/export');
const { walkDirectory, isObjectArray } = require('../src/utilities/exports_util')
const currentDirectory = process.cwd();
const configPath = walkDirectory('../').find(obj => obj.fileName === 'msc.config.json').filePath;
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : undefined;

async function startBuild() {
  const startTime = performance.now()
  const directoryPath = path.join(currentDirectory, config.inputDirectory);
  try {
    const files = await fsPromise.readdir(directoryPath);
    // Loads all js files in the directory: 
    await Promise.all(files.map(file => loadFile(path.join(directoryPath, file))));
    await buildFiles();
    const endTime = performance.now()
    BuildLog.info(`Completed in ${(Math.floor(Math.round(endTime - startTime)) / 1000).toFixed(1)} seconds`)
  } catch (err) {
    BuildLog.error(`Error reading directory: ${err}`, err.stack);
    process.exit(1);
  }
}


async function buildFiles() {
  await fsPromise.mkdir('build', { recursive: true });
  await fsPromise.mkdir('build/BP', { recursive: true });
  await buildManifest();
  await buildRegistryFiles('blocks', BlockRegistry.Registries);
  await buildRegistryFiles('items', ItemRegistry.Registries);
  await buildRegistryFiles('entities', EntityRegistry.Registries);
}
async function buildRegistryFiles(subfolder, registries) {
  if (registries.length > 0) {
    await fsPromise.mkdir(`build/BP/${subfolder}`, { recursive: true });
    registries.forEach(async registry => {
      const fileName = registry.name.toLowerCase()
      console.warn(fileName)
      await fsPromise.writeFile(
        `build/BP/${subfolder}/${fileName}.json`,
        await registry.init()
      );

      BuildLog.info(`Created ${fileName}`);
    });
  }
}

async function buildFluidFiles() {
  if (FluidRegistry.Registries.length > 0) {
    await fsPromise.mkdir('build/BP/scripts', { recursive: true });
    FluidRegistry.Registries.forEach(async (registry, index) => {
      const filename = registry.name;
      BuildLog.info(`Created ${filename}.js`);

    });
  };
}

async function buildManifest() {
  const outputDir = path.join(process.cwd(), 'build/BP/manifest.json');
  const minecraftVersion = await getMinecraftVersion();

  let manifestStructure = {
    "format_version": 2,
    "header": {
      "name": config?.project?.name || "",
      "description": config?.project?.description || "",
      "uuid": uuid(),
      "min_engine_version": config?.minEngineVersion || minecraftVersion.replaceAll('.', ',').split(',', 3).map(str => Number(str)),
      "version": [1, 0, 0]
    },
    "modules": [
      {
        "type": "data",
        "uuid": uuid(),
        "version": [1, 0, 0]
      }
    ]
  };

  if (config.scriptModules) {
    if (!manifestStructure['dependencies']) manifestStructure['dependencies'] = [];
    manifestStructure['modules'].push(
      {
        "type": "script",
        "language": "javascript",
        "entry": `"scripts/${config.scriptEntry}"`,
        "uuid": uuid(),
        "version": [1, 0, 0]
      }
    );

    if (isObjectArray(config.scriptModules)) {
      for (const obj of config.scriptModules) {
        const version = obj.version || await getSemVer(obj.name);
        BuildLog.warn(`Version for ${obj.name} not specified. Using current version: ${version}`);
        manifestStructure['dependencies'].push(
          {
            "module_name": obj.name,
            "version": `"${version}"`
          }
        );
      }
    } else {
      for (const str of config.scriptModules) {
        const version = await getSemVer(str);
        BuildLog.warn(`Version for ${str} not specified. Using current version: ${version}`);
        manifestStructure['dependencies'].push(
          {
            "module_name": str,
            "version": `"${version}"`
          }
        );
      }
    }
  }

  await fsPromise.writeFile(outputDir, JSON.stringify(manifestStructure, null, 2));
}

async function getSemVer(packageName) {
  try {
    const packageResponse = (await axios.get(`https://registry.npmjs.org/${packageName}`)).data;
    const minecraftVer = semver.coerce(await getMinecraftVersion());
    const matchingVersions = Object.keys(packageResponse.versions)
      .filter(ver => ver.includes('stable')).sort((a) => semver.compare(a, minecraftVer))
    const closestVersion = matchingVersions[0].replace(/\.1(\.\d+)?\.\d+-stable|\.\d+$/i
      , '');
    return closestVersion;
  } catch (error) {
    BuildLog.error('Error in getSemVer:', error.message, error.stack);
    return null;
  }
}

async function getMinecraftVersion() {
  try {
    const versionInfo = (await axios.get('https://raw.githubusercontent.com/Mojang/bedrock-samples/main/version.json')).data;
    const version = versionInfo.latest.version;
    return version;
  } catch (error) {
    BuildLog.error('Error in getMinecraftVersion:', error.message);
  }
}


function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) reject();
    BuildLog.info(`Loading file: ${filePath}`);
    try {
      require(filePath);
      resolve();
    } catch (error) {
      BuildLog.error(`Error loading file ${filePath}:`, error);
      reject(error);
    }
  });
}

module.exports = {
  startBuild
};

startBuild()