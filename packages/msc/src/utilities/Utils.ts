import { readdirSync, promises as fsPromise } from "fs";
import type {
  FileResult,
  FileResultFunction,
  ObjectStruct,
  float,
  int,
} from "../types";
import path from "path";
import Log from "./Log.ts";
import { computeLevenshteinDistance, OBJtoJson } from "./RandomFunctions.ts";

// Type Guards
const isInt = (n: number): n is int => {
  return Number.isInteger(n);
};

const isFloat = (n: number): n is float => {
  return !isInt(n);
};

// Type checking functions
function isType(a: any[], type: string): boolean {
  return Array.isArray(a) && a.every((element) => typeof element === type);
}

const isAlpha = (c: any): boolean => {
  return typeof c === "string" && c.toUpperCase() !== c.toLowerCase();
};

const isNegative = (n: number): boolean => {
  return n < 0;
};

// Utility Functions
function checkProperties(obj: any, allowedProperties: string[]) {
  const unknownProperties: string[] = Object.keys(obj).filter(
    (prop) => !allowedProperties.includes(prop)
  );
  return unknownProperties;
}

// File Operations
namespace FileOperations {
  export function walkDir(
    dirPath: string,
    filterTypes: string[] = []
  ): FileResult[] {
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

  export function getWorkspaceFiles(
    dirPath: string,
    mapfn?: FileResultFunction<FileResult>,
    filterfn?: FileResultFunction<boolean>,
    skipPaths: string[] = ["node_modules"]
  ) {
    return new Promise<FileResult[]>((resolve) => {
      let files = walkDir(dirPath, skipPaths);
      if (mapfn) files.forEach((files, index) => (files[index] = mapfn(files)));
      if (filterfn) files = files.filter(filterfn);
      resolve(files);
    });
  }

  export function findClosestFile(
    files: FileResult[],
    targetName: string
  ): FileResult | undefined {
    let closestFile: FileResult | undefined;
    let minDistance = Infinity;

    files.forEach((file) => {
      const fileName = path.parse(file.fileName).name.toLowerCase();
      const distance = computeLevenshteinDistance(
        fileName,
        targetName.toLowerCase()
      );
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
  arr.forEach((element) => {
    const elementType = typeof element;
    types[elementType] = (types[elementType] || 0) + 1;
  });

  let maxCount = 0;
  let mostCommonType = "";
  for (const type in types) {
    if (types[type] > maxCount) {
      maxCount = types[type];
      mostCommonType = type;
    }
  }
  return mostCommonType;
}

/**
 * Fetches and parses the model based on the provided model name.
 * @param modelName The name of the model to fetch.
 * @returns The parsed model object if successful, otherwise returns undefined.
 */
async function getModel(modelName: string): Promise<any> {
  try {
    const cwd = process.cwd();
    const texturesFolder = path.join(cwd, "RP/textures");
    const modelsFolder = path.join(cwd, "RP/models");
    const modelFile = FileOperations.findClosestFile(
      await FileOperations.getWorkspaceFiles(modelsFolder),
      modelName
    );
    const texturePath = FileOperations.findClosestFile(
      await FileOperations.getWorkspaceFiles(texturesFolder),
      modelName
    )?.filePath;
    if (modelFile && texturePath) {
      const fileExtension = path.extname(modelFile.fileName).toLowerCase();
      switch (fileExtension) {
        case ".obj":
          const objContent = await fsPromise.readFile(modelFile.filePath, {
            encoding: "utf-8",
          });
          return OBJtoJson(objContent, texturePath, modelName);
        case ".json":
          const parsedFile = JSON.parse(
            await fsPromise.readFile(modelFile.filePath, { encoding: "utf8" })
          );
          return parsedFile;
        default:
          Log.error(`Unsupported model file format for ${modelName}`);
      }
    } else {
      Log.error(
        `Unable to find ${
          !texturePath ? "texture" : "model"
        } file for ${modelName}`
      );
    }
  } catch (error) {
    Log.error(`Error fetching model ${modelName}: ${error}`);
    return undefined;
  }
}

function getExtendedClass(childClass: ObjectStruct) {
  const classSource = childClass.toString();
  const extendsMatch = classSource.match(/extends\s+([A-Z][a-zA-Z_$\d]*)/);
  if (extendsMatch) {
    const match = extendsMatch[1];
    // Make sure it does not extend base class
    if (
      [
        "Block",
        "Entity",
        "Item",
        "IClientEntity",
        "Fluid",
        "Effect",
        "Enchant",
        "Advancement",
      ].includes(match)
    )
      return;
    return match;
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
  getModel,
  getExtendedClass,
};
