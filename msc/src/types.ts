// Basic Types
type float = number;
type int = number;
type bool = boolean;
type path = string;

type Vec3Array = [number, number, number];

type ObjectStruct<K extends string | number | symbol = string, T = any> = {
  [key in K]: T;
};

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Vec2 {
  x: number;
  y: number;
}

// interface ModelOptions {
// position: Vec3;
// rotation: Vec2;
// }

interface FileResult {
  filePath: path;
  fileName: string;
}

type FileResultFunction<R> = (fileResult: FileResult) => R;

export {
  ObjectStruct,
  Vec3,
  Vec3Array,
  bool,
  float,
  int,
  path,
  FileResult,
  FileResultFunction,
};
