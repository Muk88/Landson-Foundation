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
        // Brand palette
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
        // Semantic typography colours
        ink: '#0C160A',       // near-black primary heading colour
        body: '#374151',      // gray-700 — prose/body
        muted: '#6B7280',     // gray-500 — secondary text
      },
      fontFamily: {
        display: ['var(--font-display)', 'Barlow Condensed', 'sans-serif'],
        heading: ['var(--font-heading)', 'Barlow Semi Condensed', 'sans-serif'],
        body: ['var(--font-body)', 'Lato', 'sans-serif'],
      },
      fontSize: {
        // Display sizes (Barlow Condensed)
        'display-xl': ['clamp(5rem, 12vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(3.5rem, 8vw, 6rem)',  { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.5rem, 5vw, 4rem)',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        // Heading sizes (Barlow Semi Condensed)
        'h1': ['clamp(2.5rem, 6vw, 4rem)',   { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.875rem, 4vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'h3': ['clamp(1.25rem, 2.5vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        // Label
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slow-zoom':  'slowZoom 20s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s ease-in-out infinite',
        'skeleton':   'skeletonWave 1.8s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        skeletonWave: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
