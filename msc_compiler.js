const { BlockRegistry } = require("./api/Registries/BlockRegistry");
const fs = require("fs");
const { promises: fsPromise } = fs;
const path = require("path");
const { ItemRegistry } = require("./api/Registries/ItemRegistry");
const currentDirectory = process.cwd();
const configPath = path.join(currentDirectory, '/msc.config.json');
const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : undefined;

async function loadFilesInDir() {
  const directoryPath = path.join(currentDirectory, config.inputDirectory)
  try {
    const files = await fsPromise.readdir(directoryPath);
    const fileLoad = files.map(file => loadFile(path.join(directoryPath, file)));
    await Promise.all(fileLoad);
    await buildFiles();
  } catch (err) {
    console.error(`Error reading directory: ${err}`,err.stack);
    process.exit(1);
  }
}

async function buildFiles() {
  await fsPromise.mkdir('build', { recursive: true });
  await fsPromise.mkdir('build/BP', { recursive: true });
  if (BlockRegistry.Registries.length > 0) {
    await fsPromise.mkdir('build/BP/blocks', { recursive: true });

    BlockRegistry.Registries.forEach(async registry => {
      const registryParsed = JSON.parse(registry);
      let filename = registryParsed["minecraft:block"]["description"]["identifier"].split(':')[1];

      await fsPromise.writeFile(
        `build/BP/blocks/${filename}.json`,
        JSON.stringify(registryParsed, null, 2)
      );
      console.log(`Created ${filename}`);
    });
  }

  if (ItemRegistry.Registries.length > 0){
    await fsPromise.mkdir('build/BP/items',{recursive:true})
    ItemRegistry.Registries.forEach(async registry=>{
      const registryParsed = JSON.parse(registry);
      let filename = registryParsed["minecraft:item"]["description"]["identifier"].split(':')[1];
      await fsPromise.writeFile(
        `build/BP/items/${filename}.json`,
        JSON.stringify(registryParsed, null, 2)
      );
      console.log(`Created ${filename}`);
    })
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
