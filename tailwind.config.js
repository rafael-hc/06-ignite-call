import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  space,
} from '@rhcode/tokens'
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx', './src/app/**/*.tsx'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },
      colors,
      fontSize: fontSizes,
      fontWeight: fontWeights,
      lineHeight: lineHeights,
      borderRadius: radii,
      spacing: space,
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.Heading': {
          color: '#E1E1E6',
          lineHeight: '125%',
          margin: 0,
        },
        '.Text': {
          color: '#E1E1E6',
          lineHeight: '160%',
          margin: 0,
        },
      })
    }),
  ],
}
