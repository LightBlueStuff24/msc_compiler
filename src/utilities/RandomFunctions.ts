async function ArrToObj(array) {
  let object = {}
  array.map((x,i)=>object[i] = x)
}

// [{}, {}]
// {0: {}, 1: {}}