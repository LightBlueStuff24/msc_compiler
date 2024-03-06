import { readdirSync } from "fs";
import type { float, int, FileResult, ObjectStruct } from "./typedef.ts";
import path from "path";


const isFloat = (n: number): n is float => { return `${n}`.includes(".") };
const isInt = (n: number): n is int => { return Number.isInteger(n) };
const isAlpha = (c: any): boolean => { return typeof c === 'string' && c.toUpperCase() !== c.toLowerCase() };
const isNegative = (n: number): boolean => { return n < 0 };

const getLabel = (i: int): string => {
  const labels = ['component', 'child', 'subChild', 'prop', 'subProp'];
  return labels[i] || `label${i + 1}`;
};


function isObjectArray(a: any[]): a is ObjectStruct[] {
  return Array.isArray(a) && a.every(element => typeof element === 'object');
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
  isObjectArray,
  walkDir
}