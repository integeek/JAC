/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
/*
    screens: {
      // => @media (min-width: 1280px) { ... }
      "none": "0px",

      "tel": "360px",
      "tablet": "640px",
      // => @media (min-width: 640px) { ... }

      "laptop": "1024px",
      // => @media (min-width: 1024px) { ... }

      "ordi": "1280px",
  
    }, */
    extend: {},
  },
  plugins: [require("daisyui", "mui","flowbite/plugin, tw-elements/dist/plugin")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
}