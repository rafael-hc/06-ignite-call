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
  important: true,
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
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('tp', '& input[type=time]::-webkit-calendar-picker-indicator')
    }),
  ],
}
