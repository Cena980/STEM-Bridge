/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Times New Roman"', 'serif'], // replace default sans font
      },
    },
  },
  plugins: [],
};
