/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,js}",
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('flowbite/plugin'),
    require("tw-elements/dist/plugin.cjs")
  ],
  darkMode: "class"
}
