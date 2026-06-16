const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('.next') && !dirFile.includes('node_modules')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const srcDir = path.join('/Users/sunub/workspace/for-digital-divide/frontend/src');
const files = walkSync(srcDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('@/app/login/')) {
    content = content.replace(/@\/app\/login\//g, '@/app/onboarding/');
    changed = true;
  }
  
  if (content.includes('../login/LoginGuide/')) {
    content = content.replace(/\.\.\/login\/LoginGuide\//g, '../onboarding/OnboardingGuide/');
    changed = true;
  }
  
  if (content.includes('../../login/LoginGuide/')) {
    content = content.replace(/\.\.\/\.\.\/login\/LoginGuide\//g, '../../onboarding/OnboardingGuide/');
    changed = true;
  }

  // Also fix registerUserAction.ts missing import
  if (file.endsWith('registerUserAction.ts') && content.includes('isRedirectError')) {
    if (!content.includes('isRedirectError')) {
      // It's in the catch block but needs import
    }
    if (!content.includes('import { isRedirectError }')) {
      content = 'import { isRedirectError } from "next/dist/client/components/redirect";\n' + content;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}
console.log("Imports fixed");
