function isFloat(n){return`${n}`.includes(".")}
function isInt(n){return`${n}`.includes(".")?false:(Number(n)?true:false)};
function isAlpha(c){return c.toUpperCase()!=c.toLowerCase()}