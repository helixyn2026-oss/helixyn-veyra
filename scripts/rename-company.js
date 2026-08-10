const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (!['node_modules', '.git', '.next', 'public'].includes(file)) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (
        dirFile.endsWith('.ts') || 
        dirFile.endsWith('.tsx') || 
        dirFile.endsWith('.json') || 
        dirFile.endsWith('.md')
      ) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync(path.join(__dirname, '..'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/MabbleAI/g, 'Helixyn')
    .replace(/mabbleai/g, 'helixyn')
    .replace(/Mabble/g, 'Helixyn')
    .replace(/mabble/g, 'helixyn')
    .replace(/digimabble/g, 'helixyn')
    .replace(/DigiMabble/g, 'Helixyn');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
console.log('Global rename complete.');
