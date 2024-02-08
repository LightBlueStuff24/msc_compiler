
// Cache lib data to reduce start up time
require('v8-compile-cache');
const { BuildLog } = require('./buildLog');
const { promises: fsPromise, existsSync, readFileSync } = require("fs");
const { watch } = require('chokidar');
const path = require("path");
const { v4: uuid } = require('uuid');
const semver = require('semver');
const { EntityRegistry, FluidRegistry, ItemRegistry, BlockRegistry } = require('../src/registries/export');
const { walkDirectory, isObjectArray } = require('../utilities/exports_util');
const currentDirectory = process.cwd();
const config = getConfig('../')
const directoryPath = path.join(currentDirectory, config.inputDirectory);

async function startBuild() {
  try {
    const startTime = performance.now();
    const files = await getFilesInWorkspace((file) => file.filePath)
    await Promise.all(files.map(file => loadFile(file)));
    await buildFiles();

    const endTime = performance.now();
    const delta = endTime - startTime;
    const buildTime = (Math.floor(Math.round(delta)) / 1000).toFixed(1)
    BuildLog.info(`Completed in ${buildTime} seconds`);
  } catch (err) {
    BuildLog.error(`Error in startBuild: ${err}`);
  }
}

async function buildFiles() {
  await Promise.all([
    fsPromise.mkdir('build', { recursive: true }),
    fsPromise.mkdir('build/BP', { recursive: true }),
    buildRegistryFiles('blocks', BlockRegistry.Registries),
    buildRegistryFiles('items', ItemRegistry.Registries),
    buildRegistryFiles('entities', EntityRegistry.Registries),
    buildFluidFiles(),
    buildManifest()
  ]);
}

async function buildRegistryFiles(subfolder, registries) {
  if (registries.length > 0) {
    await fsPromise.mkdir(`build/BP/${subfolder}`, { recursive: true });
    await Promise.all(registries.map(async regEntry => {
      // This is a bad practice but necessary as static classes when extended do not inherit the properties of the (when the class is static)class they extend
      const fileName = regEntry.name.toLowerCase();
      await fsPromise.writeFile(
        `build/BP/${subfolder}/${fileName}.json`,
        regEntry.init()
      );
      BuildLog.info(`Created ${fileName}`);
    }));
  }
}

async function buildFluidFiles() {
  if (FluidRegistry.Registries.length > 0) {
    await fsPromise.mkdir('build/BP/scripts', { recursive: true });
    await Promise.all(FluidRegistry.Registries.map(async (registry) => {
      const filename = registry.name;
      BuildLog.info(`Created ${filename}.js`);
    }));
  }
}

async function buildManifest() {
  const outputDir = path.join(currentDirectory, 'build/BP/manifest.json');
  const minecraftVersion = await getMinecraftVersion(true);
  let manifestStructure = {
    "format_version": 2,
    "header": {
      "name": config?.project?.name || "",
      "description": config?.project?.description || "",
      "uuid": uuid(),
      "min_engine_version": config?.minEngineVersion || minecraftVersion,
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
        "entry": `scripts/${config.scriptEntry}`,
        "uuid": uuid(),
        "version": [1, 0, 0]
      }
    );

    if (isObjectArray(config.scriptModules)) {
      for (const obj of config.scriptModules) {
        const version = obj.version || await getSemVer(obj.name);
        if (!obj.version) BuildLog.warn(`Version for module "${obj.name}" not specified. Using current version: ${version}`);
        manifestStructure['dependencies'].push(
          {
            "module_name": obj.name,
            "version": `${version}`
          }
        );
      }
    } else {
      for (const str of config.scriptModules) {
        const version = await getSemVer(str);
        BuildLog.warn(`Version for module "${str}" not specified. Using current version: ${version}`);
        manifestStructure['dependencies'].push(
          {
            "module_name": str,
            "version": `${version}`
          }
        );
      }
    }
  }

  await fsPromise.writeFile(outputDir, JSON.stringify(manifestStructure, null, 2));
}

function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) reject();
    const fileName = path.basename(filePath)
    BuildLog.info(`Loading file: ${fileName}`);

    try {

      require(filePath);
      resolve();
    } catch (error) {
      BuildLog.error(`Error loading file ${fileName}:`, error);
      reject(error);
    }
  });
}

function watchFiles(pth, disable = false) {
  const globPattern = path.join(pth, '**/*.+(js|ts)')
  const watcher = watch(globPattern, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    },
    ignorePermissionErrors: true
  });
  watcher.on('change', async () => await startBuild())
}
module.exports = {
  startBuild
};

startBuild();

//#region Getter Functions:


async function getSemVer(packageName) {
  try {
    const packageResponse = await (await fetch(`https://registry.npmjs.org/${packageName}`)).json();
    const minecraftVer = semver.coerce(await getMinecraftVersion());
    const matchingVersions = Object.keys((await packageResponse).versions)
      .filter(ver => ver.includes('stable')).sort((a) => semver.compare(a, minecraftVer))
    const closestVersion = matchingVersions[0].replace(/\.1(\.\d+)?\.\d+-stable|\.\d+$/i, '');
    return closestVersion;
  } catch (error) {
    BuildLog.error('Error in getSemVer:', error.message);
    return null;
  }
}

async function getMinecraftVersion(toArray = undefined) {
  try {
    const versionInfo = await (await fetch('https://raw.githubusercontent.com/Mojang/bedrock-samples/main/version.json')).json();
    const version = versionInfo.latest.version;
    return toArray ? version.replaceAll('.', ',').split(',', 3).map(str => Number(str)) : version
  } catch (error) {
    BuildLog.error('Error in getMinecraftVersion:', error.message);
  }
}

// Finds and parses the config file in the users workspace
function getConfig(path) {
  const files = walkDirectory(path);
  const configPath = files.find(obj => obj.fileName === 'msc.config.json').filePath;
  return existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : undefined;
}
/**
 * 
 * @param {function(any) : any} [mapfn] 
 * Gets the files that are in the input directory
 */
async function getFilesInWorkspace(mapfn = undefined) {
  const files = walkDirectory(directoryPath)
  console.warn(files.map(mapfn))
  return mapfn ? files.map(mapfn) : files
}

//#endregion