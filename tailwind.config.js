/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sregular: ["Satoshi-Regular", "Poppins-Regular"],
        smedium: ["Satoshi-Medium", "Poppins-Medium"],
        ssemibold: ["Satoshi-Variable", "Poppins-SemiBold"],
        sbold: ["Satoshi-Bold", "Poppins-Bold"],
      },
      // Font color
      colors: {
        primary: "#1C1C1E",
        secondary: {
          base: "#f7bc63",
          100: "#f7bc63",
          200: "#f7bc63",
          saturated: "#f7bc63",
        },
        white: "#FDFDFE",
        yellowishgreen: {
          100: "#D3EE98",
          200: "#A0D683",
          300: "#72BF78",
        },
        black: "#161616",
        lessBlack: "#2C2C2E"
      }
    },
  },
  plugins: [],
};
