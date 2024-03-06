// Basic Types
type float = number;
type int = number;
type bool = boolean;
type path = string;


type VectorArray = [number, number, number]


type ObjectStruct<K extends string | number | symbol = string, T = any> = {
    [key in K]: T;
};

interface FileResult {
    filePath: path,
    fileName: string
}


export type {
    float,
    int,
    bool,
    path,
    ObjectStruct,
    FileResult,
    VectorArray
}