/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lp: {
          bg: '#09090b',
          card: 'rgba(255,255,255,0.02)',
          border: 'rgba(255,255,255,0.06)',
          green: '#00e676',
          purple: '#8b6cf6',
          amber: '#d97750',
          cyan: '#40c4ff',
          yellow: '#ffd740',
          red: '#ff5252',
        }
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeSlideUp 0.4s ease forwards',
        'pulse-dot': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
