/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      padding: '20px',
    },
    extend: {
      // Extend with custom colors, fonts, spacing here if needed
    },
  },
  plugins: [],
}