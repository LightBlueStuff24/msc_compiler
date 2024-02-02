const path = require('path');
const fs = require('fs'); const { statSync } = require('fs');

const isStringArray = (a)=> {
  if (!Array.isArray(a)) return false;
  return a.every(element => typeof element === 'string')
}

const isObjectArray = (a)=> {
  if (!Array.isArray(a)) return false;
  return a.every(element => typeof element === 'object')
}


function walkDirectory(pat) {
  const files = []
  fs.readdirSync(pat).forEach(file => {
      const filePath  = path.join(pat, file)
      const stat = statSync(filePath)
      if (stat.isFile()) {
          files.push({fileName:file,filePath:filePath})
      } else if (stat.isDirectory()) {
          files.push(...walkDirectory(filePath))
      }
  })
  return files
}

/**
 * @param {number} index 
 * @returns {string} Label for the given index
 */
const getLabel = (i)=> {
  const labels = ['component', 'child', 'subChild', 'prop', 'subProp'];
  return labels[i] || `label${i + 1}`;
}

/**
 * @param {object} t 
 * @param {*} o 
 * @param {string[]} l 
 * @param {string} e 
 * @returns {Error} Error message
 */
const ME = (t, o, l, e) => {
  const locationLabels = l.map((label, index) => `[${getLabel(index)}:${label}]`);
  const errorMessage = `[${t.name}] ${locationLabels.join(' ')}: Expected ${e}, instead found ${typeof o}`;
  return new Error(errorMessage);
};

const isFloat = function (n) { return `${n}`.includes(".") }
const isInt = function (n) { return `${n}`.includes(".") ? false : (Number(n) ? true : false) };
const isAlpha = function (c) { return c.toUpperCase() != c.toLowerCase() }
const isNegative = n => { return n < 0 }

const getClassExtendsOf  = function (childClass){
  const classSource = childClass.toString();
  const extendsMatch = classSource.match(/extends\s+([A-Z][a-zA-Z_$\d]*)/);

  return extendsMatch ? extendsMatch[1] : null;
}

module.exports = {
  isStringArray, ME,
  isFloat,isInt,
  isAlpha,isNegative,
  isObjectArray,
  getLabel,
  walkDirectory,
  getClassExtendsOf
}