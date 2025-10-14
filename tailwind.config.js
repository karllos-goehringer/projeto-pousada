/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                 // caso tenha classes no HTML principal
    "./src/**/*.{js,ts,jsx,tsx}",  // tudo dentro de src
    "./components/**/*.{js,ts,jsx,tsx}" // caso componentes fiquem fora de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};