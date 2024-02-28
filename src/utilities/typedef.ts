type float = number;
type int = number;
type bool = boolean;
type path = string;

interface ObjectStruct {
    [key:string] : any
}

interface FileResult {
    filePath : path,
    fileName:string
}

export type {
    float,
    int,
    bool,
    path,
    ObjectStruct,
    FileResult
}