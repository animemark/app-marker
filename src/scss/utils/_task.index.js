/**
 * help creating the index.scss file that include all scss files under this folder 
 */
const n_path = require('path')
const n_fs = require('fs')


let code = ``;

let files = n_fs.readdirSync('./')
for (let f of files) {

  if (!String(f).endsWith('.scss')) continue;
  if (String(f).startsWith('_')) continue;
  if (f === 'index.scss') continue;

  code += `
  @import "./${f}";`;
  console.log(f);
}

n_fs.writeFileSync('./index.scss', code);