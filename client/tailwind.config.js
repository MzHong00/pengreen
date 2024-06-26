/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        '112': "28rem",
        '128': '32rem',
        '144': '36rem',
        '152': '38rem',
        '160': "40rem",
      },
      gridTemplateRows: {
        'voteList': 'repeat(2, minmax(0, 20rem))',
      }
    },
  },
  plugins: [],
}

