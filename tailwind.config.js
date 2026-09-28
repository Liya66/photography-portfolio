/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js", "./site.config.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        signika: ["Signika", "sans-serif"],
        nothingyoucoulddo: ["Nothing You Could Do", "cursive"],
      },
    },
  },
  plugins: [],
};
