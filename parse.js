const fs = require('fs');
const esbuild = require('esbuild');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('src').filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
let errorsFound = false;
let out = [];
for (const f of files) {
  try {
    esbuild.transformSync(fs.readFileSync(f, 'utf8'), { loader: 'jsx' });
  } catch (e) {
    errorsFound = true;
    out.push('ERROR in ' + f + '\n' + e.message);
  }
}
if (!errorsFound) out.push('NO SYNTAX ERRORS FOUND');
fs.writeFileSync('parse-out.txt', out.join('\n'));
