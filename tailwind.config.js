/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B5ED7",   // primary
          muted: "#6B7280",  // muted text
          bg: "#F8FAFC"      // page bg
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial']
      },
      boxShadow: {
        soft: '0 6px 20px rgba(11,78,215,0.08)',
        subtle: '0 4px 12px rgba(2,6,23,0.06)'
      },
      borderRadius: {
        xl: '12px'
      }
    },
  },
  plugins: [],
}
