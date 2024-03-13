import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '400px': '400px',
        '4/12': '33.333333%',
      },
      maxHeight: {
        '400px': '400px',
        '4/12': '33.333333%',
      },
      aspectRatio: {
        '[1/1]': '1 / 1',
      },
      flex: {
        '1-33': '1 0 33.3%',
      },
      width: {
        '33%': '33%',
      },
      minHeight: {
        '33%': '33%',
      },
      height: {
        '2px': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        50: '50%',
      },
    },
  },
  plugins: [],
};
export default config;
