import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.blue['700'],
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.4xl'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.4xl'),
        },
        h2: {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.3xl'),
        },
        h3: { fontSize: theme('fontSize.lg') },
      })
    }),
  ],
}
