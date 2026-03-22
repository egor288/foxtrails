/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'title': ['title', 'sans-serif'], 
        'normal': ['normal', 'sans-serif'],
      },
    },
  },
}
