/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
             "./src/**/*.{js,ts,jsx,tsx}",
            ],
  theme: {
    extend: {
      colors: {
        'brown-orange': `#D5A100`,
        'pokemon-yellow': '#FFCC00',
        'pokemon-light-blue': '#0075BE',
        'pokemon-dark-blue': '#0A285F',
        'retro-orange-red': '#FB3617',
        'retro-orange-tan': '#FC945C',
        'retro-tan': '#F6C48E',
        'retro-light-blue': '#1D8698',
        'retro-dark-blue': '#042054',
        'pokemon-black': '#000000',
        'jade': '#00A86B',
      },
      fontFamily: {
        bolt: ['bolt', 'regular'],
        decotural: ['decotural', 'regular'],  
        Porcine: ['Porcine', 'regular'],
      }, 
    },
  },
  plugins: [],
}
