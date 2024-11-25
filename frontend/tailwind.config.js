/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      colors: {
        mint: {
          50: '#E8F1F2',
          100: '#B3EFB2',
          200: '#7A9E7E',
          300: '#31493C',
          400: '#001A23',
        },
        expense: {
          100: '#FFE5E5',
          200: '#FF8080',
          300: '#FF4040',
          400: '#CC0000',
        }
      },
    },
  },
  plugins: [],
};