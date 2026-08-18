const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'frontend/app/admin/dashboard'));

let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  if (content.includes('DUMMY_TOKEN')) {
    // 1. Add import for fetchWithAuth if not present
    if (!content.includes('fetchWithAuth')) {
      content = content.replace(
        /import\s+\{\s*API_BASE_URL\s*\}\s+from\s+['"]@\/lib\/utils\/constants['"];/,
        `import { API_BASE_URL } from '@/lib/utils/constants';\nimport { fetchWithAuth } from '@/lib/api/auth';`
      );
    }

    // 2. Replace fetch with fetchWithAuth
    content = content.replace(/await fetch\(/g, 'await fetchWithAuth(');

    // 3. Remove Authorization and X-Mock-Admin headers completely
    content = content.replace(/\s*['"]Authorization['"]:\s*['"]Bearer DUMMY_TOKEN['"]\s*,?(\s*\/\/[^\n]*)?/g, '');
    content = content.replace(/\s*['"]X-Mock-Admin['"]:\s*['"]true['"]\s*,?/g, '');
    
    // Clean up empty headers object if needed (this might leave empty headers: {}, which is fine for fetch)

    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      modifiedCount++;
      console.log('Fixed:', file);
    }
  }
}

console.log(`Finished fixing ${modifiedCount} files.`);
