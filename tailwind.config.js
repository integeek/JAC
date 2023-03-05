/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {

    screens: {
      "tablet": "640px",
      // => @media (min-width: 640px) { ... }

      "laptop": "1024px",
      // => @media (min-width: 1024px) { ... }

      "desktop": "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [require("daisyui", "mui","flowbite/plugin")],
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