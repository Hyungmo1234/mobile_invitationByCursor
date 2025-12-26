/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          gold: '#D4AF37',
          pink: '#FFE5E5',
          rose: '#FFB6C1',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-main)', 'var(--font-noto)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        main: ['var(--font-main)', 'sans-serif'],
        cafe24: ['var(--font-cafe24-gallery)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

