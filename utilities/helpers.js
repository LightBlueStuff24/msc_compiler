const path = require('path');
const {readFileSync, readdirSync } = require('fs');
const semver = require('semver');
const { BuildLog: Log } = require('./buildLog')
const isStringArray = (a) => {
  if (!Array.isArray(a)) return false;
  return a.every(element => typeof element === 'string')
}

const isObjectArray = (a) => {
  if (!Array.isArray(a)) return false;
  return a.every(element => typeof element === 'object')
}
/**
 * 
 * @param {string} pth 
 * @returns {Array<{fileName:string; filePath:string}>}
 */
function walkDirectory(pth,filterTypes = []) {
  let files = [];
  const dirents = readdirSync(pth, { withFileTypes: true });
  for (const dirent of dirents) {
    const filePath = path.join(pth, dirent.name);
    if (dirent.isDirectory() && !filterTypes.includes(dirent.name)) {
      files = files.concat(walkDirectory(filePath));
    } else {
      if (filterTypes.includes(dirent.name)) continue;
      files.push({ fileName: dirent.name, filePath: filePath });
    }
  }
  return files;
}


/**
 * @param {number} index 
 * @returns {string} Label for the given index
 */
const getLabel = (i) => {
  const labels = ['component', 'child', 'subChild', 'prop', 'subProp'];
  return labels[i] || `label${i + 1}`;
}

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
    Log.error('Error in getSemVer:', error.message);
    return null;
  }
}

async function getMinecraftVersion(toArray = undefined) {
  try {
    const versionInfo = await (await fetch('https://raw.githubusercontent.com/Mojang/bedrock-samples/main/version.json')).json();
    const version = versionInfo.latest.version;
    return toArray ? version.replaceAll('.', ',').split(',', 3).map(str => Number(str)) : version;
  } catch (error) {
    Log.error('Error in getMinecraftVersion:', error.message);
  }
}

// Finds and parses the config file in the users workspace
async function getConfig(path) {
  try {
    const files = await getFilesInWorkspace(path, undefined, (file) => file.fileName.endsWith('.json'));
    const configPath = files.find(obj => obj.fileName === 'msc.config.json')?.filePath;
    const packageJsonPath = files.find(obj=>obj.fileName === 'package.json')?.filePath;
    const configFile = JSON?.parse(readFileSync(configPath)) ?? undefined
    const packageFile = JSON?.parse(readFileSync(packageJsonPath)) ?? undefined
    return {mscConfig:configFile,packageConfig:packageFile};
  } catch (error) {
    Log.error('Error in getConfig:', error.message);
    return {};
  }
}

/**
 * Gets the files that are in the input directory.
 * @param {string} directoryPath - The path to the directory.
 * @param {function(any):any} [mapfn] - Optional mapping function applied to each file.
 * @param {function(any):any} [filterfn] - Optional mapping function applied to each file.
 * @returns {Promise<Array<any>>} An array of files from the directory, optionally mapped by the provided function.
 */
async function getFilesInWorkspace(directoryPath, mapfn = undefined, filterfn = undefined,skipTypes=['node_modules']) {
  let files = await new Promise((resolve) => resolve(walkDirectory(directoryPath,skipTypes)));
  if (mapfn) files = files.map(mapfn);
  if (filterfn) files = files.filter(filterfn);
  return files;
}



//#endregion

/**
 * @param {object} t 
 * @param {*} o 
 * @param {string[]} l 
 * @param {string} e 
 * @returns {Error} Error message
 */
const ME = (t, o, l, e) => {
  const locationLabels = l.map((label, index) => `[${getLabel(index)}:${label}]`);
  const errorMessage = `[${t.name}] ${locationLabels.join(' ')}: Expected ${e}, instead found ${typeof o}`;
  return new Error(errorMessage);
};

const isFloat = function (n) { return `${n}`.includes(".") }
const isInt = function (n) { return `${n}`.includes(".") ? false : (Number(n) ? true : false) };
const isAlpha = function (c) { return c.toUpperCase() != c.toLowerCase() }
const isNegative = n => { return n < 0 }

const getClassExtendsOf = function (childClass) {
  const classSource = childClass.toString();
  const extendsMatch = classSource.match(/extends\s+([A-Z][a-zA-Z_$\d]*)/);
  return extendsMatch ? extendsMatch[1] : null;
}

const inheritStaticProperties = function (subclass, superclass) {
  const inheritedProperties = Object.getOwnPropertyNames(superclass);
  inheritedProperties.forEach(property => {
    if (!Object.hasOwnProperty.call(subclass, property)) {
      subclass[property] = superclass[property];
    }
  });
}


module.exports = {
  isStringArray, ME,
  isFloat, isInt,
  isAlpha, isNegative,
  isObjectArray,
  getLabel,
  walkDirectory,
  getClassExtendsOf,
  inheritStaticProperties,
  getConfig,
  getFilesInWorkspace,
  getSemVer,
  getMinecraftVersion
}