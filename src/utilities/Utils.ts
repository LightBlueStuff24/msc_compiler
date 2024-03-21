import { readdirSync } from "fs";
import type { float, int, FileResult, FileResultFunction } from "./typedef.ts";
import path from "path";

const isFloat = (n: number): n is float => { return `${n}`.includes("."); };
const isInt = (n: number): n is int => { return Number.isInteger(n); };
const isAlpha = (c: any): boolean => { return typeof c === 'string' && c.toUpperCase() !== c.toLowerCase(); };
const isNegative = (n: number): boolean => { return n < 0; };


function checkProperties(obj: any, allowedProperties: string[]) {
  const unknownProperties: string[] = Object.keys(obj).filter(prop => !allowedProperties.includes(prop));
  return unknownProperties;
}



function WalkDir(dirPath: string, filterTypes: string[] = []): FileResult[] {
  let files: FileResult[] = [];
  const dirents = readdirSync(dirPath, { withFileTypes: true });
  for (const dirent of dirents) {
    const filePath = path.join(dirPath, dirent.name); // Constructing file path using path module
    if (dirent.isDirectory() && !filterTypes.includes(dirent.name)) {
      files = files.concat(WalkDir(filePath));
    } else {
      if (!filterTypes.includes(dirent.name)) {
        files.push({ fileName: dirent.name, filePath: filePath });
      }
    }
  }
  return files;
}


function GetWorkspaceFiles(dirPath: string, mapfn?: FileResultFunction<FileResult>, filterfn?: FileResultFunction<FileResult[]>, skipTypes: string[] = ['node_modules']) {
  return new Promise<FileResult[]>((resolve) => {
    let files = WalkDir(dirPath, skipTypes);
    if (mapfn) files = files.map(mapfn);
    if (filterfn) files = files.filter(filterfn);
    resolve(files);
  });
}


function isType(a: any[], type: string): boolean {
  return Array.isArray(a) && a.every(element => typeof element === type);
}


function getArrayType(arr: any[]): string {
  const types: { [key: string]: number; } = {};
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

function GetBlockModel(block){

}

export {
  GetWorkspaceFiles,
  isAlpha,
  isFloat,
  isInt,
  isNegative,
  checkProperties,
  WalkDir,
  isType,
  getArrayType,
  GetBlockModel
};