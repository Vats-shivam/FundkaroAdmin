/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      darkPrimary:"#0E2C86",
      lightPrimary:"#4169E1",
      },
      fontFamily:{
        primaryFont: "Urbanist",
      }

    },
  },
  plugins: [],
}

