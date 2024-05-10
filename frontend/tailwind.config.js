/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        duolingo: {
          'green': '#50c800',
          'green-light': '#66ff00',
          'blue': '#1899d6',
          'blue-light': '#1db6ff'
        }
      }
    },
  },
  plugins: [],
}

