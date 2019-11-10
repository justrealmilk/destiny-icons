const fs = require('fs');
const path = require('path');

const root = '../';

function dirTree(filename) {

  var stats = fs.lstatSync(filename),
    info = {
      path: filename.replace(root, ''),
      name: path.basename(filename)
    };
  
  if (['/.git', '/LICENSE', '/readme.md', '/docs', '/docs-build'].includes(info.path)) return false;

  if (stats.isDirectory()) {
    info.type = 'folder';
    info.children = fs.readdirSync(filename).map(function(child) {
      return dirTree(filename + '/' + child);
    }).filter(f => f);
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = 'file';
    info.content = fs.readFileSync(filename).toString();
  }

  return info;
}

const index = dirTree(root);

fs.writeFile(`./src/data.json`, JSON.stringify(index), 'utf8', () => {});
