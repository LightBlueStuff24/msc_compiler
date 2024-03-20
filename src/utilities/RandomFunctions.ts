// I don't know what this is for
async function ArrToObj(array : [string,any][]) {
return Object.fromEntries(array)
}
// [{}, {}]
// {0: {}, 1: {}}