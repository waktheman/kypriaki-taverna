/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#C85A3C',
        // AA-compliant variants for small text: deep on light bg, light on dark bg
        'terracotta-deep': '#A6462B',
        'terracotta-light': '#E0825F',
        gold: '#D4AF6F',
        sage: '#556B4D',
        cream: '#F5F1E8',
        charcoal: '#2B2B2B',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
