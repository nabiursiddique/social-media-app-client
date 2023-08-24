/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["light", "dark"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: 'Poppins',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [require("daisyui")],
}