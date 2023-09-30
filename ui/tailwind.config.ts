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
      },
      colors: {
        base: { // blue
          '50': '#eef3ff',
          '100': '#e0e9ff',
          '200': '#c7d5fe',
          '300': '#a5b8fc',
          '400': '#8192f8',
          '500': '#636df1',
          '600': '#3b3ae3',
          '700': '#3c38ca',
          '800': '#3130a3',
          '900': '#2e2f81',
          '950': '#1c1b4b',
        },
        _accent: {  // gray
          '50': '#f9f9f9',
          '100': '#f3f3f3',
          '200': '#e9e9e9',
          '300': '#d8d8d8',
          '400': '#bfbfbf',
          '500': '#a6a6a6',
          '600': '#8c8c8c',
          '700': '#737373',
          '800': '#595959',
          '900': '#404040',
        },
        __accent: { // yellow
          '50': '#f3f1e4',
          '100': '#e9e7cd',
          '200': '#e0dcb5',
          '300': '#d6d19d',
          '400': '#ccc785',
          '500': '#c3bc6d',
          '600': '#b9b255',
          '700': '#afa73d',
          '800': '#a69c26',
          '900': '#9c920e',
        },
        accent: { // red
          '50': '#f3f0f0',
          '100': '#f4d6d6',
          '200': '#f6bbbb',
          '300': '#f7a0a0',
          '400': '#f88686',
          '500': '#fa6a6a',
          '600': '#fb5050',
          '700': '#fc3535',
          '800': '#fe1a1a',
          '900': '#ff0000',
        },
      }
    },
  },
  plugins: [],
}
export default config
