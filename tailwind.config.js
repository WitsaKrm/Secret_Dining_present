/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0605',
          900: '#0A0605',
          800: '#120B09',
          700: '#1B1210',
        },
        wine: {
          DEFAULT: '#5A0F17',
          light: '#7A1620',
          dark: '#320A0F',
          deep: '#210608',
        },
        gold: {
          DEFAULT: '#C9A567',
          bright: '#E8C87A',
          dim: '#8A7248',
          pale: '#E9DCB8',
        },
        parchment: '#EDE3CE',
        smoke: '#8A7C70',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.75) 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 40px rgba(201,165,103,0.35)',
        'glow-wine': '0 0 60px rgba(122,22,32,0.5)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
        drift: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        flicker: 'flicker 4s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
      },
    },
  },
  plugins: [],
}
