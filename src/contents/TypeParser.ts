import Log from "../utilities/Log";

function parseArray(array: number[] | boolean[] | string[], ...indexs: Array<any>) {
  for (let i = 0; i < indexs.length - 1; i++) {
    if (typeof array[i] != indexs[i]) return Log.error(`${array[i]} doesn't match ${indexs[i]}`)
    else return array;
  }
}