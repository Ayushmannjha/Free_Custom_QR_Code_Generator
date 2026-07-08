import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17231b',
        paper: '#f7f5ef',
        moss: '#71801e',
        lime: '#d7f44a',
      },
      boxShadow: {
        soft: '0 16px 48px rgba(23, 35, 27, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
