const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
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
  let newContent = content.replace(/digihelixyn/g, 'helixyn');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Fixed: ${file}`);
  }
});
console.log('Cleanup rename complete.');
