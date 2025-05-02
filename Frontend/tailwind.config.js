/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        'earth-brown': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e8d8d3',
          300: '#ddc2b8',
          400: '#d2a28c',
          500: '#bc8a74',
          600: '#a5785e',
          700: '#8c624d',
          800: '#704e3e',
          900: '#5c4132',
        },
        'leaf-yellow': {
          50: '#fcfdf6',
          100: '#f8fadc',
          200: '#f1f6b5',
          300: '#e5eb82',
          400: '#d4dc50',
          500: '#bdc439',
          600: '#9da12d',
          700: '#787c25',
          800: '#606325',
          900: '#505420',
        },
        'water-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'fade-in': 'fadeIn 1s ease-in both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
