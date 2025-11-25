/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        otsBlue: "#2563eb",        // Primary blue
        otsLightBlue: "#3b82f6",   // Secondary blue
        otsDark: "#1e293b",        // Dark text
        otsGray: "#f1f5f9",        // Light gray background
      },
    },
  },
  plugins: [],
};
