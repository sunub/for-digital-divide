'use client';

import { preload } from 'react-dom';

export function PreloadResources() {
  preload('sprite.svg', { as: 'image' });
  return null;
}
