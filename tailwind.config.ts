/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        pan: {
          '0%': {
            backgroundPosition: '0% 0%',
          },
          '100%': {
            backgroundPosition: '100% 0%',
          },
        },
      },
      animation: {
        pan: 'pan 180s linear infinite',
      },
      backgroundSize: {
        '10%': '10%',
      },
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
        1: '1rem',
        2: '2rem',
        phone: '376px',
        numpad: '40px',
        '33%': '33%',
      },
      borderColor: {
        text: 'var(--color-text)',
        confirm: 'var(--color-confirm)',
      },
      minHeight: {
        '33%': '33%',
      },
      height: {
        1: '1rem',
        2: '2rem',
        4: '4rem',
        phone: '779px',
        numpad: '50px',
        '2px': '2px',
      },
      backgroundImage: {
        numpad: 'url(/images/numpad.png)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'error-pattern': 'url(/error_page.svg)',
      },
      boxShadow: {
        card_lower: `0px 1.2px 3.2px rgba(0, 0, 0, 0.02),
        0px 2.9px 7.6px rgba(0, 0, 0, 0.028),
        0px 5.4px 14.3px rgba(0, 0, 0, 0.035),
        0px 9.6px 25.5px rgba(0, 0, 0, 0.042),
        0px 18px 47.6px rgba(0, 0, 0, 0.05),
        0px 43px 114px rgba(0, 0, 0, 0.07)`,
      },
      borderRadius: {
        50: '50%',
        phone: '50px',
      },
      backgroundColor: {
        text: 'var(--color-text)',
        confirm: 'var(--color-confirm)',
      },
      blur: {
        1: '1px',
        2: '2px',
      },
      colors: {
        border: 'oklch(42.44% 0.011 17.58)',
        input: {
          DEFAULT: 'oklch(65.57% 0.19552898037793698 288.17775174927874)',
          invalid: 'oklch(73.96% 0.1963 25.278467161119735)',
        },
        ring: {
          DEFAULT: 'oklch(86.83% 0.06751643147886291 285.8383540015746)',
          invalid: 'oklch(64.17% 0.221 26.06)',
        },
        background: 'var(--color-background)',
        foreground: {
          DEFAULT: 'oklch(76.7% 0.123 284.14)',
          destructive: 'oklch(64.17% 0.221 26.06)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--color-background)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        device: {
          DEFAULT: 'oklch(96.88% 0.015 294.47)',
          foreground: 'oklch(92.86% 0.036 289.07)',
          text: 'oklch(60.31% 0.105 291.44)',
        },
        pinInput: {
          DEFAULT: 'oklch(92.86% 0.036 289.07)',
        },
        drawer: {
          DEFAULT: 'oklch(76.64% 0.13 292.01)',
          foreground: 'oklch(96.88% 0.015 294.47)',
        },
      },
    },
  },
  plugins: [],
};
