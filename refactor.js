const fs = require('fs');
const path = require('path');

const files = [
  "frontend/src/app/login/LoginGuide/VerifySelectionGuide.tsx",
  "frontend/src/app/login/LoginGuide/VerifyInfoGuide.tsx",
  "frontend/src/app/login/LoginGuide/VerifyOtpGuide.tsx",
  "frontend/src/app/login/LoginGuide/TermsGuide.tsx",
  "frontend/src/app/login/LoginGuide/IdCardSelectionGuide.tsx",
  "frontend/src/app/login/LoginGuide/IdCardInfoGuide.tsx",
  "frontend/src/app/login/LoginGuide/SuccessGuide.tsx",
  "frontend/src/app/register-pin/guides/RegisterPinPhaseGuide.tsx",
  "frontend/src/app/register-pin/guides/ConfirmPinPhaseGuide.tsx",
  "frontend/src/app/dashboard/DashboardGuide.tsx"
];

for (const relPath of files) {
  const fullPath = path.join("/Users/sunub/workspace/for-digital-divide", relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');

  if (!content.includes('import { Flex, Grid }')) {
    content = content.replace(
      'from "react-icons/md";', 
      'from "react-icons/md";\nimport { Flex, Grid } from "@internal/design-system/primitives";'
    );
  }

  // panelContainer
  content = content.replace(/<div className=\{styles\.panelContainer\}>/, '<Flex direction="column" className={styles.panelContainer}>');
  // Find the last </div> in the file which belongs to panelContainer
  content = content.replace(/<\/div>\n  \);\n\}/, '</Flex>\n  );\n}');

  // infoGrid
  content = content.replace(/<div className=\{styles\.infoGrid\}>/, '<Grid className={styles.infoGrid}>');
  // The infoGrid closes before sectionContainer. 
  // We can find:
  //         </div>
  //       </div>
  // 
  //       <div className={styles.sectionContainer}>
  content = content.replace(/<\/div>\n      <\/div>\n\n      <div className=\{styles\.sectionContainer\}>/, '</Flex>\n      </Grid>\n\n      <Flex direction="column" className={styles.sectionContainer}>');
  
  // Actually, replacing all infoBox:
  content = content.replace(/<div className=\{styles\.infoBox\}>/g, '<Flex direction="column" className={styles.infoBox}>');
  // For each infoBox closing, we need to match the inner structure. 
  // Let's do it with a simple string split/join for infoIconContainer.
  content = content.replace(/<div className=\{styles\.infoIconContainer\}>/g, '<Flex alignItems="center" justifyContent="center" className={styles.infoIconContainer}>');
  
  // Since infoIconContainer closes right after the icon:
  content = content.replace(/size=\{24\} \/>\n          <\/div>/g, 'size={24} />\n          </Flex>');

  // The infoBox closes after the inner div (which has h3 and p).
  // Inner div:
  //           <div>
  //             <h3 className={styles.infoTitle}>...</h3>
  //             <p className={styles.infoDescription}>...</p>
  //           </div>
  //         </div>
  content = content.replace(/<\/div>\n        <\/div>/g, '</div>\n        </Flex>');

  // sectionContainer - first one already partly matched above if we didn't use global. 
  // Let's just do global replace for sectionContainer opening:
  content = content.replace(/<div className=\{styles\.sectionContainer\}>/g, '<Flex direction="column" className={styles.sectionContainer}>');
  // Closing of sectionContainer is usually:
  //       </div>
  // 
  //       <Flex direction="column" className={styles.sectionContainer}>
  // or 
  //       </div>
  //     </Flex>
  content = content.replace(/<\/div>\n\n      <Flex direction="column" className=\{styles\.sectionContainer\}>/g, '</Flex>\n\n      <Flex direction="column" className={styles.sectionContainer}>');
  
  // For the last sectionContainer closing:
  content = content.replace(/<\/ul>\n      <\/div>\n    <\/Flex>/g, '</ul>\n      </Flex>\n    </Flex>');

  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Refactoring complete");
