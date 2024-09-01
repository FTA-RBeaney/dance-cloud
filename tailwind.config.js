/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui", require("flowbite-typography"))],
};
