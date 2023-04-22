/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
}
