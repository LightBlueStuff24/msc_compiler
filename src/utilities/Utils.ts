import { readdirSync, promises as fsPromise } from "fs";
import type { FileResult, FileResultFunction, ObjectStruct, float, int } from "./typedef.ts";
import path from "path";
import Log from "./Log.ts";
import { computeLevenshteinDistance } from "./RandomFunctions.ts";


// Type Guards
const isInt = (n: number): n is int => {
  return Number.isInteger(n);
};

const isFloat = (n: number): n is float => {
  return !isInt(n);
};

// Type checking functions
function isType(a: any[], type: string): boolean {
  return Array.isArray(a) && a.every(element => typeof element === type);
}

const isAlpha = (c: any): boolean => {
  return typeof c === 'string' && c.toUpperCase() !== c.toLowerCase();
};

const isNegative = (n: number): boolean => {
  return n < 0;
};

// Utility Functions
function checkProperties(obj: any, allowedProperties: string[]) {
  const unknownProperties: string[] = Object.keys(obj).filter(prop => !allowedProperties.includes(prop));
  return unknownProperties;
}


// File Operations Namespace
namespace FileOperations {
  export function walkDir(dirPath: string, filterTypes: string[] = []): FileResult[] {
    let files: FileResult[] = [];
    const dirents = readdirSync(dirPath, { withFileTypes: true });
    for (const dirent of dirents) {
      const filePath = path.join(dirPath, dirent.name);
      if (dirent.isDirectory() && !filterTypes.includes(dirent.name)) {
        files.push(...walkDir(filePath));
      } else if (!filterTypes.includes(dirent.name)) {
        files.push({ fileName: dirent.name, filePath });
      }
    }
    return files;
  }

  export function getWorkspaceFiles(dirPath: string, mapfn?: FileResultFunction<FileResult>, filterfn?: FileResultFunction<boolean>, skipPaths: string[] = ['node_modules']): Promise<FileResult[]> {
    return new Promise<FileResult[]>((resolve) => {
      let files = walkDir(dirPath, skipPaths);
      if (mapfn) files = files.map(mapfn);
      if (filterfn) files = files.filter(filterfn);
      resolve(files);
    });
  }

  export function findClosestFile(files: FileResult[], targetName: string): FileResult | undefined {
    let closestFile: FileResult | undefined;
    let minDistance = Infinity;

    files.forEach(file => {
      const fileName = path.parse(file.fileName).name.toLowerCase();
      const distance = computeLevenshteinDistance(fileName, targetName.toLowerCase());
      if (distance < minDistance) {
        minDistance = distance;
        closestFile = file;
      }
    });

    return closestFile;
  }
}



function getArrayType(arr: any[]): string {
  const types: ObjectStruct<string, number> = {};
  arr.forEach(element => {
    const elementType = typeof element;
    types[elementType] = (types[elementType] || 0) + 1;
  });

  let maxCount = 0;
  let mostCommonType = '';
  for (const type in types) {
    if (types[type] > maxCount) {
      maxCount = types[type];
      mostCommonType = type;
    }
  }
  return mostCommonType;
}

async function getModel(modelName: string): Promise<any> {
  const cwd = process.cwd();
  const texturesFolder = path.join(cwd, 'RP/textures');
  const modelsFolder = path.join(cwd, 'RP/models');

  // Fetch all files in the RP/textures and RP/models directories
  const textureFiles = await FileOperations.getWorkspaceFiles(texturesFolder);
  const modelFiles = await FileOperations.getWorkspaceFiles(modelsFolder);
  const modelFile = modelFiles.find(file => file.fileName === modelName);

  if (modelFile) {
    try {
      const fileExtension = path.extname(modelFile.fileName);
      if (fileExtension === '.obj') {
        // Convert OBJ to JSON
        const objContent = await fsPromise.readFile(modelFile.filePath, { encoding: 'utf8' });
        const fileName = path.basename(modelFile.filePath);

        const parsedJSON = OBJtoJSON(objContent);
        return parsedJSON;
      } else if (fileExtension === '.json') {
        const parsedFile = JSON.parse(await fsPromise.readFile(modelFile.filePath, { encoding: 'utf8' }));
        return parsedFile;
      } else {
        Log.error(`Unsupported model file format for ${modelName}`);
        return;
      }
    } catch (error) {
      Log.error(`Error parsing model file ${modelName}: ${error}`);
      return;
    }
  } else {
    Log.error(`Unable to find model file ${modelName}`);
    return;
  }
}


export {
  FileOperations,
  isAlpha,
  isFloat,
  isInt,
  isNegative,
  checkProperties,
  isType,
  getArrayType,
  getModel
};

function OBJtoJSON(objContent: string) {
  throw new Error("Function not implemented.");
}

