/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',  
  theme: {
    extend: {
      backgroundImage: {
        site: "url('./assets/site-bg.jpg')",
      },
    },
  },
  plugins: [],
};
