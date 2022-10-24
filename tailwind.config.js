/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
