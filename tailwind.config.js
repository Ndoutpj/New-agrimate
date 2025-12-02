/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core System Colors */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* near-black */
        border: 'var(--color-border)', /* light gray */
        input: 'var(--color-input)', /* pure white */
        ring: 'var(--color-ring)', /* deep forest green */
        
        /* Card & Surface Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* pure white */
          foreground: 'var(--color-card-foreground)' /* near-black */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white */
          foreground: 'var(--color-popover-foreground)' /* near-black */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* very light gray */
          foreground: 'var(--color-muted-foreground)' /* medium gray */
        },
        
        /* Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep forest green */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        
        /* Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* rich earth brown */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* vibrant harvest orange */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        
        /* State Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* fresh green */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)' /* white */
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      boxShadow: {
        'agricultural-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'agricultural': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'agricultural-lg': '0 8px 24px rgba(0, 0, 0, 0.2)'
      },
      animation: {
        'grow': 'gentle-grow 800ms ease-out',
        'cloud': 'cloud-drift 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite'
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '800': '800ms'
      },
      transitionTimingFunction: {
        'agricultural': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      minHeight: {
        'touch': '44px'
      },
      minWidth: {
        'touch': '44px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}