// Cache lib data to reduce start up time
require('v8-compile-cache');
require('keypress')(process.stdin);
const { BuildLog } = require('./buildLog');
const { promises: fsPromise, existsSync, readFileSync } = require("fs");
const { watch } = require('chokidar');
const path = require("path");
const { v4: uuid } = require('uuid');
const semver = require('semver');
const { EntityRegistry, FluidRegistry, ItemRegistry, BlockRegistry } = require('../src/registries/export');
const { walkDirectory, isObjectArray } = require('../utilities/exports_util');
const currentDirectory = process.cwd();


async function startBuild(inputDir = undefined, outputDir = undefined) {
  try {
    const config = await getConfig(); // Retrieve configuration
    const outputDirectory = outputDir ?? "dist" // Default name
    const inputDirectory = inputDir ?? config.inputDirectory
    const directoryPath = path.join(currentDirectory, inputDirectory);
    const startTime = performance.now();
    const files = await getFilesInWorkspace(directoryPath, (file) => file.filePath);
    await Promise.all(files.map(file => loadFile(file)));
    await buildFiles(config, outputDirectory);
    const endTime = performance.now();
    const delta = endTime - startTime;
    const buildTime = (Math.floor(delta) / 1000).toFixed(1);
    BuildLog.info(`Completed in ${buildTime} seconds`);
  } catch (err) {
    BuildLog.error(`Error in startBuild: ${err}`);
  }
}

async function buildFiles(config, outputDirName = undefined) {
  await Promise.all([
    fsPromise.mkdir(outputDirName, { recursive: true }),
    fsPromise.mkdir(`${outputDirName}/BP`, { recursive: true }),
    buildRegistryFiles('blocks', BlockRegistry.Registries, outputDirName),
    buildRegistryFiles('items', ItemRegistry.Registries, outputDirName),
    buildRegistryFiles('entities', EntityRegistry.Registries, outputDirName),
    buildManifest(config, outputDirName)
  ]);
}

async function buildRegistryFiles(subfolder, registries, outputDirName = undefined) {
  if (registries.length > 0) {
    await fsPromise.mkdir(`${outputDirName}/BP/${subfolder}`, { recursive: true });
    await Promise.all(registries.map(async regEntry => {
      const fileName = regEntry.name.toLowerCase();
      console.warn(regEntry.init())
      await fsPromise.writeFile(
        `${outputDirName}/BP/${subfolder}/${fileName}.json`,
        regEntry.init() // Fixed serialization issue
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
      await fsPromise.writeFile(
        `build/BP/scripts/${filename}.js`,
        ""
      );
      BuildLog.info(`Created ${filename}.js`);
    }));
  }
}

async function buildManifest(config, outputDirName = undefined) {
  const outputDir = path.join(currentDirectory, `${outputDirName}/BP/manifest.json`);
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
    const fileName = path.basename(filePath);
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

function watchFiles(pth = currentDirectory) {

  const globPattern = path.join(pth, '**/*.+(js|ts)');
  const watcher = watch(globPattern, {
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    },
    ignorePermissionErrors: true,
  });

  BuildLog.info('File Watcher Started!', 'Press Shift + X to stop watching');

  // Rebuild project
  watcher.on('change', async () => {
    await startBuild();
  });

  // Listen for the "keypress" event
  process.stdin.on('keypress', (_, key) => {
    if (key && key.shift && key.name === 'x') {
      BuildLog.info('Stopping watcher...');
      watcher.close(); // Close the watcher when "Shift + X" is pressed
      process.exit(0);
    }
  });

  // Start listening for keypress events
  process.stdin.setRawMode(true);
  process.stdin.resume();
}


module.exports = {
  startBuild, watchFiles
};



//#region Getter Functions:

async function getSemVer(packageName) {
  try {
    const packageResponse = await (await fetch(`https://registry.npmjs.org/${packageName}`)).json();
    const minecraftVer = semver.coerce(await getMinecraftVersion());
    const matchingVersions = Object.keys(packageResponse.versions)
      .filter(ver => ver.includes('stable')).sort((a) => semver.compare(a, minecraftVer)); // Fixed sorting function
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
    return toArray ? version.replaceAll('.', ',').split(',', 3).map(str => Number(str)) : version;
  } catch (error) {
    BuildLog.error('Error in getMinecraftVersion:', error.message);
  }
}

// Finds and parses the config file in the users workspace
async function getConfig() {
  try {
    const files = await getFilesInWorkspace('../');
    const configPath = files.find(obj => obj.fileName === 'msc.config.json')?.filePath;
    return existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : undefined;
  } catch (error) {
    BuildLog.error('Error in getConfig:', error.message);
    return {};
  }
}

/**
 * Gets the files that are in the input directory.
 * 
 * @template T
 * @param {string} directoryPath - The path to the directory.
 * @param {function(any):any} [mapfn] - Optional mapping function applied to each file.
 * @returns {Promise<Array<T>>} An array of files from the directory, optionally mapped by the provided function.
 */
async function getFilesInWorkspace(directoryPath, mapfn = undefined) {
  const files = await new Promise((resolve) => resolve(walkDirectory(directoryPath)));
  return !!mapfn ? files.map(mapfn) : files;
}



//#endregion
