import { readdirSync } from "fs";
import type { float, int, FileResult } from "./typedef.ts";
import path from "path";


const isFloat = (n: number): n is float => { return `${n}`.includes("."); };
const isInt = (n: number): n is int => { return Number.isInteger(n); };
const isAlpha = (c: any): boolean => { return typeof c === 'string' && c.toUpperCase() !== c.toLowerCase(); };
const isNegative = (n: number): boolean => { return n < 0; };


function checkProperties(obj: any, allowedProperties: string[]) {
  const unknownProperties: string[] = Object.keys(obj).filter(prop => !allowedProperties.includes(prop));
  return unknownProperties;
}



function walkDir(dirPath: string, filterTypes: string[] = []): FileResult[] {
  let files: FileResult[] = [];
  const dirents = readdirSync(dirPath, { withFileTypes: true });
  for (const dirent of dirents) {
    const filePath = path.join(dirPath, dirent.name); // Constructing file path using path module
    if (dirent.isDirectory() && !filterTypes.includes(dirent.name)) {
      files = files.concat(walkDir(filePath));
    } else {
      if (!filterTypes.includes(dirent.name)) {
        files.push({ fileName: dirent.name, filePath: filePath });
      }
    }
  }
  return files;
}


function getWorkspaceFiles(dirPath: string, mapfn?: (fileResult: FileResult) => FileResult, filterfn?: (fileResult: FileResult) => FileResult[], skipTypes: string[] = ['node_modules']) {
  return new Promise<FileResult[]>((resolve) => {
    let files = walkDir(dirPath, skipTypes);
    if (mapfn) files = files.map(mapfn);
    if (filterfn) files = files.filter(filterfn);
    resolve(files);
  });
}

export {
  getWorkspaceFiles,
  isAlpha,
  isFloat,
  isInt,
  isNegative,
  checkProperties,
  walkDir
};