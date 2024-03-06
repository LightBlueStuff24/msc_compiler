
async function ArrToObj(array : [string,any][]) {
return Object.fromEntries(array)
}
// [{}, {}]
// {0: {}, 1: {}}