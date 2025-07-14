/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
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
  					backgroundPosition: '0% 0%'
  				},
  				'100%': {
  					backgroundPosition: '100% 0%'
  				}
  			}
  		},
  		animation: {
  			pan: 'pan 180s linear infinite'
  		},
  		backgroundSize: {
  			'10%': '10%'
  		},
  		maxWidth: {
  			'400px': '400px',
  			'4/12': '33.333333%'
  		},
  		maxHeight: {
  			'400px': '400px',
  			'4/12': '33.333333%'
  		},
  		aspectRatio: {
  			[1 / 1]: '1 / 1'
  		},
  		flex: {
  			'1-33': '1 0 33.3%'
  		},
  		width: {
  			'1': '1rem',
  			'2': '2rem',
  			phone: '376px',
  			numpad: '40px',
  			'33%': '33%',
  			button: '100px'
  		},
  		borderColor: {
  			text: 'var(--color-text)',
  			confirm: 'var(--color-confirm)'
  		},
  		minHeight: {
  			'33%': '33%'
  		},
  		height: {
  			'1': '1rem',
  			'2': '2rem',
  			'4': '4rem',
  			phone: '779px',
  			numpad: '50px',
  			'2px': '2px',
  			button: '50px'
  		},
  		backgroundImage: {
  			numpad: 'url(/images/numpad.png)',
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'error-pattern': 'url(/error_page.svg)'
  		},
  		boxShadow: {
  			card_lower: '`0px 1.2px 3.2px rgba(0, 0, 0, 0.02),\\n        0px 2.9px 7.6px rgba(0, 0, 0, 0.028),\\n        0px 5.4px 14.3px rgba(0, 0, 0, 0.035),\\n        0px 9.6px 25.5px rgba(0, 0, 0, 0.042),\\n        0px 18px 47.6px rgba(0, 0, 0, 0.05),\\n        0px 43px 114px rgba(0, 0, 0, 0.07)`',
  			button: 'inset 0 4px 8px rgba(0, 0, 0, 0.25)',
  			'button-active': '0 4px 8px rgba(0, 0, 0, 0.55)'
  		},
  		borderRadius: {
  			'50': '50%',
  			phone: '50px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundColor: {
  			text: 'var(--color-text)',
  			confirm: 'var(--color-confirm)'
  		},
  		blur: {
  			'1': '1px',
  			'2': '2px'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			device: {
  				DEFAULT: 'oklch(96.88% 0.015 294.47)',
  				foreground: 'oklch(92.86% 0.036 289.07)',
  				text: 'oklch(60.31% 0.105 291.44)'
  			},
  			pinInput: {
  				DEFAULT: 'oklch(92.86% 0.036 289.07)'
  			},
  			drawer: {
  				DEFAULT: 'oklch(76.64% 0.13 292.01)',
  				foreground: 'oklch(96.88% 0.015 294.47)'
  			},
  			'button-default': {
  				DEFAULT: 'oklch(90.62% 0.047 286.718)',
  				foreground: 'oklch(28.06% 0.024 291.84)'
  			},
  			'button-active': {
  				DEFAULT: 'oklch(56.76% 0.071 292.01 / 95.53%)',
  				foreground: 'oklch(96.88% 0.015 294.47)'
  			},
  			'button-confirm': {
  				DEFAULT: 'oklch(84.32% 0.114 146.91)',
  				foreground: 'oklch(46.84% 0.099 111.15)'
  			},
  			'button-destructive': {
  				DEFAULT: 'oklch(74.12% 0.157 25.26)',
  				foreground: 'oklch(28.06% 0.024 291.84)'
  			},
  			'destructive-active': {
  				DEFAULT: 'oklch(56.18% 0.182 25.26)',
  				foreground: 'oklch(96.88% 0.015 294.47)'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
