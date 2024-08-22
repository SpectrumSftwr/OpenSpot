/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand": {
          50: "#E6F9F0",
          100: "#C9F3DF",
          200: "#97E7C2",
          300: "#62DBA2",
          400: "#2FCB82",
          500: "#239760",
          600: "#1C784D",
          700: "#155B3A",
          800: "#0E3E28",
          900: "#071D13",
          950: "#04110B"
        },
      },
    },
  },
  plugins: [],
}
