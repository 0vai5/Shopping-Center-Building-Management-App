/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        sregular: ["Satoshi-Regular","Poppins-Regular"],
        smedium: ["Satoshi-Medium","Poppins-Medium"],
        ssemibold: ["Satoshi-Variable","Poppins-SemiBold"],
        sbold: ["Satoshi-Bold","Poppins-Bold"]
      },
      // Font color
      colors: {
        primary: "FEEC37",
        secondary: "#FFF100",
        yellowishgreen: {
          100: "#D3EE98",
          200: "#A0D683",
          300: "#72BF78"
        }
      }
    },
  },
  plugins: [],
}