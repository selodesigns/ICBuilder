module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#18181b',
        surface: '#23272f',
        accent: {
          primary: '#00ffe7',
          secondary: '#00bcd4',
        },
        grid: '#2dd4bf',
        error: '#ff3860',
        success: '#22c55e',
        text: {
          primary: '#f4f4f5',
          secondary: '#a1a1aa',
          disabled: '#52525b',
        },
        digicoins: '#ffe066',
        programs: '#38bdf8',
        traces: '#00ffe7',
        building: {
          power: '#fbbf24',
          storage: '#818cf8',
          network: '#f472b6',
        },
      },
      boxShadow: {
        neon: '0 0 8px 2px #00ffe7',
        accent: '0 0 8px 2px #00bcd4',
      },
      borderColor: {
        selection: '#00ffe7',
      },
    },
  },
  plugins: [],
};
