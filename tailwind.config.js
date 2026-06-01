/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crown: {
          black:   '#080808',
          charcoal:'#111111',
          mid:     '#1a1a1a',
          surface: '#222222',
          border:  '#2a2a2a',
          muted:   '#555555',
          ash:     '#888888',
          cream:   '#e8e4de',
          white:   '#f5f5f5',
          gold:    '#b8960c',
          'gold-lt':'#d4af37',
        },
      },
      fontFamily: {
        heading: ['\'Bebas Neue\'', 'Impact', 'sans-serif'],
        body:    ['\'Inter\'', 'system-ui', 'sans-serif'],
        mono:    ['\'JetBrains Mono\'', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.76, 0, 0.24, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
