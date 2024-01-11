const { promises: fsPromise, existsSync, readFileSync } = require("fs");
const path = require("path");
const {EntityRegistry,FluidRegistry,ItemRegistry,BlockRegistry,RecipeRegistry} = require('../Registries/export')

const currentDirectory = process.cwd();
const configPath = '../../msc.config.json';
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : undefined;
async function loadFilesInDir() {
  const startTime = performance.now()
  const directoryPath = path.join(currentDirectory, config.inputDirectory);
  try {
    const files = await fsPromise.readdir(directoryPath);
    // Loads all js files in the directory: 
    await Promise.all(files.map(file => loadFile(path.join(directoryPath, file))));
    await buildFiles();
    const endTime = performance.now()
    console.log(`Completed in ${Math.floor(Math.round(endTime - startTime)) / 1000} s`)
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
      
    });
      console.log(`Created ${filename}.js`);
    };
  }


function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) reject(process.exit(1));
    require(filePath);
    resolve();
  });
}

loadFilesInDir();
