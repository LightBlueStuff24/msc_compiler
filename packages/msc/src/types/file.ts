import { path } from './general'

interface FileResult {
    filePath: path;
    fileName: string;
}

type FileResultFunction<T> = (fileResult: FileResult) => T;

export {
    FileResult,
    FileResultFunction
}