/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#F3F4F6',
        anthracite: '#2D3748',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}