/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc4fd',
          400: '#36a4fa',
          500: '#0c87eb',
          600: '#006ac9',
          700: '#0154a3',
          800: '#064786',
          900: '#0a3c6f',
          950: '#07264a',
        },
        surface: {
          dark: '#0a0f1d',
          card: '#111827',
          cardHover: '#1f293d',
          border: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
