/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'sds-light': 'var(--sds-light)',
        'sds-dark': 'var(--sds-dark)',
        'sds-pink': 'var(--sds-pink)',
        'sds-blue': 'var(--sds-blue)',
        // The color from Radix theme is used.
        // @todo: Move the color to our styles.
        'sds-accent-a11': 'var(--accent-a11)',
      },
      fontFamily: {
        inter: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        // The color from Radix theme is used.
        // @todo: Move the color to our styles.
        toast: 'inset 0 0 0 1px var(--accent-a7)',
      },
    },
  },
  plugins: [],
}
