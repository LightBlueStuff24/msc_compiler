const isFloat = (n: string) => { return `${n}`.includes(".") }
const isInt = (n: string) => { return `${n}`.includes(".") ? false : (Number(n) ? true : false) };
const isAlpha = (c:any) => { return c.toUpperCase() != c.toLowerCase() }
const isNegetive = (n) => { return n < 0 }
const getLabel = (i) => {
  const labels = ['component', 'child', 'subChild', 'prop', 'subProp'];
  return labels[i] || `label${i + 1}`;
}
async function isObjectArray(a) {
  if (!Array.isArray(a)) return false;
  return a.every(element => typeof element === 'object')
}
function walkDir(path: string, filterTypes=[]) {
  let files = [];
  const dirents = readdirSync(path, { withFileTypes: true });
  for (const dirent of dirents) {
    const filePath = path.join(path, dirent.name);
    if (dirent.isDirectory() && !filterTypes.includes(dirent.name)) {
      files = files.concat(walkDir(filePath));
    } else {
      if (filterTypes.includes(dirent.name)) continue;
      files.push({ fileName: dirent.name, filePath: filePath });
    }
  }
  return files;
}
async function getWorkspaceFiles(dirPath: string, mapfn = undefined, filterfn = undefined, skipTypes=['node_modules']) {
  let files = await new Promise<T>((resolve) => {
    resolve(walkDir(dirPath, skipTypes))
  })
  if(mapfn) files = files.map(mapfn)
  if(filterfn) files = files.filter(filterfn);
  return files;
}
