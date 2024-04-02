// Basic Types
type float = number;
type int = number;
type bool = boolean;
type path = string;


type Vec3Array = [number, number, number];


type ObjectStruct<K extends string | number | symbol = string, T = any> = {
    [key in K]: T;
};

interface FileResult {
    filePath: path,
    fileName: string;
}

type FileResultFunction<T> = (fileResult: FileResult) => T;

export type {
    float,
    int,
    bool,
    path,
    ObjectStruct,
    FileResult,
    Vec3Array,
    FileResultFunction
};