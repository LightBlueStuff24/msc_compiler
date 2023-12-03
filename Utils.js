exports.isFloat=function(n){return`${n}`.includes(".")}
exports.isInt=function(n){return`${n}`.includes(".")?false:(Number(n)?true:false)};
exports.isAlpha=function(c){return c.toUpperCase()!=c.toLowerCase()}
exports.isNegative = n =>{return n < 0 }
