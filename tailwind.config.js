/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo 500
        secondary: "#ec4899", // Pink 500
        dark: {
          900: "#0f172a", // Slate 900
          800: "#1e293b", // Slate 800
          700: "#334155", // Slate 700
        },
        light: {
          100: "#f1f5f9", // Slate 100
          200: "#e2e8f0", // Slate 200
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],

};
