const { promises: fsPromise, existsSync, readFileSync, readdir } = require("fs");
const path = require("path");
const { BlockRegistry } = require("./api/Registries/BlockRegistry");
const { ItemRegistry } = require("./api/Registries/ItemRegistry");
const { EntityRegistry } = require('./api/Registries/EntityRegistry');
const { FluidRegistry } = require("./api/Registries/FluidRegistry");

const currentDirectory = process.cwd();
const configPath = path.join(currentDirectory, '/msc.config.json');
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : undefined;

async function loadFilesInDir() {
  const directoryPath = path.join(currentDirectory, config.inputDirectory);
  try {
    const files = await fsPromise.readdir(directoryPath);
    await Promise.all(files.map(file => loadFile(path.join(directoryPath, file))));
    await buildFiles();
  } catch (err) {
    console.error(`Error reading directory: ${err}`, err.stack);
    process.exit(1);
  }
}

async function buildFiles() {
  await fsPromise.mkdir('build', { recursive: true });
  await fsPromise.mkdir('build/BP', { recursive: true });
  await buildRegistryFiles('blocks', BlockRegistry.Registries, 'minecraft:block');
  await buildRegistryFiles('items', ItemRegistry.Registries, 'minecraft:item');
  await buildRegistryFiles('entities', EntityRegistry.Registries, 'minecraft:entity');
  await buildFluidFiles();
}

async function buildRegistryFiles(subfolder, registries, identifierKey) {
  if (registries.length > 0) {
    await fsPromise.mkdir(`build/BP/${subfolder}`, { recursive: true });
    registries.forEach(async registry => {
      const registryParsed = JSON.parse(registry);
      const filename = registryParsed[identifierKey].description.identifier.split(':')[1];

      await fsPromise.writeFile(
        `build/BP/${subfolder}/${filename}.json`,
        JSON.stringify(registryParsed, null, 2)
      );

      console.log(`Created ${filename}`);
    });
  }
}

async function buildFluidFiles() {
  if (FluidRegistry.Registries.length > 0) {
    await fsPromise.mkdir('build/BP/scripts', { recursive: true });
    FluidRegistry.Registries.forEach(async (registry, index) => {
      const filename = registry.name;
      await fsPromise.writeFile(
        `build/BP/scripts/${filename}.js`,
       registry.script
      );
      console.log(`Created ${filename}.js`);
    });
  }
}

function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) reject(process.exit(1));
    require(filePath);
    resolve();
  });
}

loadFilesInDir();
