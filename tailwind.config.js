/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0f1c',
          800: '#0f1626',
          700: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        /* hero scroll dot */
        'scroll-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':       { transform: 'translateY(10px)', opacity: '0.2' },
        },
        /* avatar ring */
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        /* gentle float */
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        /* skeleton / shimmer */
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        /* pulsing glow ring */
        'glow-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(16,185,129,0)' },
        },
        /* text gradient sweep */
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        /* bounce dot loader */
        'bounce-dot': {
          '0%, 100%': { transform: 'translateY(0)',     opacity: '0.4' },
          '50%':       { transform: 'translateY(-6px)', opacity: '1'   },
        },
        /* fade in from bottom */
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        /* fade in from left */
        'fade-right': {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'     },
        },
        /* fade in from right */
        'fade-left': {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'    },
        },
        /* scale up */
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.88)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
        /* timeline line draw */
        'line-grow': {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
      animation: {
        'scroll-dot':   'scroll-dot 1.6s ease-in-out infinite',
        'spin-slow':    'spin-slow 22s linear infinite',
        float:          'float 4s ease-in-out infinite',
        shimmer:        'shimmer 2.2s linear infinite',
        'glow-ring':    'glow-ring 2s ease-in-out infinite',
        'gradient-x':   'gradient-x 4s ease infinite',
        'bounce-dot':   'bounce-dot 1s ease-in-out infinite',
        'fade-up':      'fade-up 0.6s ease-out both',
        'fade-right':   'fade-right 0.6s ease-out both',
        'fade-left':    'fade-left 0.6s ease-out both',
        'scale-in':     'scale-in 0.5s ease-out both',
        'line-grow':    'line-grow 1s ease-out both',
      },
      backgroundSize: { '200%': '200%' },
    },
  },
  plugins: [],
}
