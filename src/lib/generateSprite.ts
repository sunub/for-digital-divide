import { globSync } from 'glob';
import fs from 'fs';

const svgFile = globSync('src/assets/svg/*.svg');
