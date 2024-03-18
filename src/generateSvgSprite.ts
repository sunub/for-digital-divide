import { globSync } from 'glob';
import fs from 'fs';
import { HTMLElement, parse } from 'node-html-parser';
import { Config as SVGOConfig, optimize } from 'svgo';
import path from 'path';

const svgoConfig: SVGOConfig = {
  plugins: [{ name: 'convertColors', params: { currentColor: true } }],
};
const svgFiles = globSync('src/components/icons/*.svg');
const symbols: string[] = [];

svgFiles.forEach((file) => {
  const code = fs.readFileSync(file, 'utf-8');
  const result = optimize(code, svgoConfig).data;

  const svgElement = parse(result).querySelector('svg') as HTMLElement;
  const symbolElement = parse('<symbol/>').querySelector(
    'symbol',
  ) as HTMLElement;
  const fileName = path.basename(file, '.svg');

  svgElement.childNodes.forEach((child) => symbolElement.appendChild(child));
  symbolElement.setAttribute('id', fileName);
  if (svgElement.attributes.viewBox) {
    symbolElement.setAttribute('viewBox', svgElement.attributes.viewBox);
  }
  symbols.push(symbolElement.toString());
});

const svgSprite = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`;

fs.writeFileSync('public/sprite.svg', svgSprite);
