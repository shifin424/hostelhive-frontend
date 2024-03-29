/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'popins': ['Poppins', 'sans-serif']
      },
      ShadowDark: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors:{
        primary_dark : "#050a19",
        secondary_dark : "#032046",
        primary_light : "#F0FCFF",
        secondary_light : "#C4CCEE",
      }
    },
  },
  plugins: [require("daisyui")],
}


