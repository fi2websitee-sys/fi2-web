import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          glow: 'var(--primary-glow)',
        },
        'red-primary': 'var(--red-primary)',
        'red-light': 'var(--red-light)',
        'red-dark': 'var(--red-dark)',
        'red-subtle': 'var(--red-subtle)',
        'red-hover': 'var(--red-hover)',
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          400: 'var(--gray-400)',
          600: 'var(--gray-600)',
          800: 'var(--gray-800)',
        },
        dark: 'var(--dark)',
        white: 'var(--white)',
        'off-white': 'var(--off-white)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
        'red-glow': 'var(--shadow-red-glow)',
      },
    },
  },
  plugins: [],
}

export default config
