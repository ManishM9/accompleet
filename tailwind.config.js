/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./popup.html",
    "./src/**/*.{js,jsx}",
    "./src/content/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      }
    },
  },
  plugins: [],
}

