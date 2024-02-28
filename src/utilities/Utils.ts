import { readdirSync } from "fs";
import type { float, int, FileResult } from "./typedef.ts";
import path from "path";

// Type guards to check if a number is float, int, alpha, or negative
const isFloat = (n: number): n is float => `${n}`.includes(".");
const isInt = (n: number): n is int => Number.isInteger(n);
const isAlpha = (c: any): boolean => typeof c === 'string' && c.toUpperCase() !== c.toLowerCase();
const isNegative = (n: number): boolean => n < 0;


const getLabel = (i: int): string => {
  const labels = ['component', 'child', 'subChild', 'prop', 'subProp'];
  return labels[i] || `label${i + 1}`;
};


async function isObjectArray(a: any[]): Promise<boolean> {
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


function getWorkspaceFiles(dirPath: string, mapfn?: (fileResult: FileResult) => FileResult, filterfn?: (fileResult: FileResult) => FileResult[], skipTypes: string[] = ['node_modules']): Promise<FileResult[]> {
  return new Promise<FileResult[]>((resolve) => {
    let files = walkDir(dirPath, skipTypes);
    if (mapfn) files = files.map(mapfn);
    if (filterfn) files = files.filter(filterfn);
    resolve(files);
  });
}
