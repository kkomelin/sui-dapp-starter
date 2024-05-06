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
    },
  },
  plugins: [],
}
