/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: '#E31E24',
            dark: '#C1181E',
            light: '#FF4D52',
            soft: 'rgba(227, 30, 36, 0.08)',
          },
          green: {
            DEFAULT: '#2D5016',
            dark: '#1F3810',
            light: '#416D25',
            soft: 'rgba(45, 80, 22, 0.08)',
          },
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
