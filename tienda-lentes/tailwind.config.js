/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}", // Asegúrate de incluir JSX
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4757', // Color principal (rojo coral)
        secondary: '#1e90ff', // Azul dodger
        dark: '#2f3542', // Gris oscuro
      },
    },
  },
  plugins: [],
}

