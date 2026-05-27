
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#F5D085',
          500: '#F3C15F',
          600: '#D9AB52',
        },
        dark: {
          800: '#2A3246', 
          850: '#21283B', 
          900: '#1B2131', 
          950: '#141824', 
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'glow':      '0 0 20px rgba(243, 193, 95, 0.4)',
        'glow-sm':   '0 0 10px rgba(243, 193, 95, 0.3)',
        'card':      '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover':'0 12px 40px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.6s ease forwards',
        'fade-in':       'fadeIn 0.4s ease forwards',
        'slide-down':    'slideDown 0.3s ease forwards',
        'float':         'float 3s ease-in-out infinite',
        'marquee':       'marquee 25s linear infinite',
        'marquee2':      'marquee2 25s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};