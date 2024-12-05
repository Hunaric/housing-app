/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'airbnb': '#ff385c',
        'airbnb-dark': '#d50027'
      }
    },
  },
  plugins: [],
}

