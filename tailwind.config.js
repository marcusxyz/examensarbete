/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backgroundImage: {
        'grid-pattern-mobile':
          'repeating-linear-gradient(to left,black,black 1px,transparent 0,transparent calc(100%/2));',
        'grid-pattern-tablet':
          'repeating-linear-gradient(to left,black,black 1px,transparent 0,transparent calc(100%/3));',
        'grid-pattern-desktop':
          'repeating-linear-gradient(to left,black,black 1px,transparent 0,transparent calc(100%/4));',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
