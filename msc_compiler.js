const { BlockRegistry } = require("./api/Registries/BlockRegistry");
const fs = require("fs");
const path = require("path");
const hide = require('hidefile')
const currentDirectory = process.cwd();
const configPath = path.join(currentDirectory, '/msc.config.json');
const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : undefined;

function loadFilesInDir() {
  const directoryPath = path.join(currentDirectory, config.inputDirectory);
  fs.readdir(directoryPath, (err, files) => {
    if (err || !files) process.exit(1);
    const fileLoad = files.map(file => loadFile(path.join(directoryPath, file)))

    Promise.all(fileLoad).then((files) => {
      //console.log(BlockRegistry.Registries["minecraft:block"]["description"]["identifier"])
    buildFiles(files);
    
    });
  });
}

function buildFiles(filesLength){
  
  fs.mkdir('build',()=>{
    fs.mkdir('build/BP',()=>{
  BlockRegistry.Registries.length !== 0 ? 
  fs.mkdir('build/BP/blocks',()=>{
  BlockRegistry.Registries.forEach(registry => {
    const registryParsed = JSON.parse(registry);
    let filename = registryParsed["minecraft:block"]["description"]["identifier"].split(':')[1];
    fs.writeFile(filename + ".json",
      JSON.stringify(registryParsed), function (err, res) {
        if (err) throw new Error(err)
        else return console.log("Created " + filename + ".json")
      });
    })
  }): undefined;

})
  })
  console.warn('Created ' + filesLength)
}

function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) reject(process.exit(1));
    require(filePath);
    resolve();
  });
}
loadFilesInDir()
