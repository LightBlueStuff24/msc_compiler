import { Log } from './fileWriter/blocks/Palm';
const fsPromises = require('fs').promises;
const { performance } = require('perf_hooks');

async function benchMark(subfolder, filename, repeatCount) {
  if (repeatCount <= 0) {
    return;
  }
  const directoryPath = `build/BP/${subfolder}`;
fsPromises.mkdir(directoryPath, { recursive: true });
  const startTime = performance.now();
  const registryParsed = JSON.parse(Log.init());
  const fileContent = JSON.stringify(registryParsed, null, 2);

  // Perform file writes in sequence
  for (let i = 1; i < repeatCount; i++) {
    const filePath = `${directoryPath}/${filename}_${i}.json`;
 fsPromises.writeFile(filePath, fileContent);
  }

  const endTime = performance.now();
  const elapsedTime = Math.round((endTime - startTime) / 1000);
  console.log(`Files generated in ${elapsedTime} seconds`);
}

const subfolder = 'blocks';
const filename = 'test';
const repeatCount = 1000000;

benchMark(subfolder, filename, repeatCount);
