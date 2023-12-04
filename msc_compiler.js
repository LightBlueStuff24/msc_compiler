const { BlockRegistry } = require("./BlockRegistry");
const fs = require("fs");
const path = require("path");
const currentDirectory = process.cwd();
const configPath = path.join(currentDirectory, '/config.json');
const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : undefined;

function loadFilesInDir() {
  const directoryPath = path.join(currentDirectory, config.inputDirectory);
  fs.readdir(directoryPath, (err, files) => {
    if (err || !files) process.exit(1);
    const fileLoad = files.map(file => loadFile(path.join(directoryPath, file)))

    Promise.all(fileLoad).then(() => {
      //console.log(BlockRegistry.Registries["minecraft:block"]["description"]["identifier"])
      BlockRegistry.Registries.forEach(registry => {
        const registryParsed = JSON.parse(registry);
        let filename = registryParsed["minecraft:block"]["description"]["identifier"].split(':')[1];
        fs.writeFile(filename + ".json",
          JSON.stringify(registryParsed), function (err, res) {
            if (err) throw new Error(err)
            else return console.log("Created " + filename + ".json")
          });
      });
    });
  });
}

function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) reject(process.exit(1));
    require(filePath);
    resolve();
  });
}

loadFilesInDir();
