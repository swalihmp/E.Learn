/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
  daisyui: {
    themes: [],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./h1_hero.png')",
      },
      colors: {
        'bgc': "#eeeff3",
        'aname': "#4b49ac",
        'acontent':"#f5f7ff",
        'cards':"#7978e9",
        'bgcart':"#0d7bf8",
        'secondary':'#cfd8dc',
        'opts':'#ac84ff',
        'icon': '#8A80FF'
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
})


 
