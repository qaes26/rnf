/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          pink: '#ffd1dc',   // Pastel Pink
          deep: '#ff6b81',   // Deep Romantic Pink
          gold: '#ffd700',   // Gold accent
          bg: '#fff0f5',     // Lavender Blush
          text: '#4a4a4a',   // Soft dark text
        }
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in forwards',
        'fade-out': 'fadeOut 1s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
