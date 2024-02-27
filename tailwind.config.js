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
      },
      boxShadow: {
        primaryShadow: '0px 0px 12px 0px #0000001A',
        dashboardshadow: '0px 2px 4px 0px #0000001A',
        blogshadow:'0px 6px 12px 0px #0000001A',
      }
    },
  },
  plugins: [],
}

