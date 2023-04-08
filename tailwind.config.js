/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html, js}'],
  theme: {
    extend: {
      colors: {
      'primary' : '#5C948A',
      'secondary' : '#28DEBE',
      'hover' : '#298B79'
    },
      lineHeight: {
        '90' : '90px'
      }},
  },
  plugins: [],
}

