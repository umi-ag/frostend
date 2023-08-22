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
        'lalezar': ['"Lalezar"'],
        'popone': ['"Mochiy Pop One"'],
        'prism': ['"Tilt Prism"'],
        'teko': ['"Teko"'],
        'qld': ['"Edu QLD Beginner"'],
        'genos': ['"Genos"'],
        'crisis': ['"Climate Crisis"'],
        'tourney': ['"Tourney"'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'snowflakes-fall': 'snowflakes-fall 10s linear infinite',
        'snowflakes-shake': 'snowflakes-shake 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
export default config
