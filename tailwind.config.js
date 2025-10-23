/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary: Soft Blue - Trust, Professional, Stable
        primary: {
          50: '#f0f4ff',   // Very light blue - background
          100: '#e0e7ff',  // Light blue - subtle backgrounds
          200: '#c7d2fe',  // Soft blue - borders, dividers
          300: '#a5b4fc',  // Medium light blue - hover states
          400: '#818cf8',  // Medium blue - secondary actions
          500: '#6366f1',  // Main blue - primary actions
          600: '#4f46e5',  // Darker blue - active states
          700: '#4338ca',  // Dark blue - text on light
          800: '#3730a3',  // Very dark blue - headings
          900: '#312e81',  // Darkest blue - emphasis
        },
        
        // Secondary: Soft Teal - Growth, Innovation, Openness
        secondary: {
          50: '#f0fdfa',   // Very light teal - backgrounds
          100: '#ccfbf1',  // Light teal - subtle accents
          200: '#99f6e4',  // Soft teal - borders
          300: '#5eead4',  // Medium light teal - hover states
          400: '#2dd4bf',  // Medium teal - secondary actions
          500: '#14b8a6',  // Main teal - primary secondary
          600: '#0d9488',  // Darker teal - active states
          700: '#0f766e',  // Dark teal - text on light
          800: '#115e59',  // Very dark teal - headings
          900: '#134e4a',  // Darkest teal - emphasis
        },
        
        // Accent: Soft Purple - Creativity, Innovation, Ideas
        accent: {
          50: '#faf5ff',   // Very light purple - backgrounds
          100: '#f3e8ff',  // Light purple - subtle accents
          200: '#e9d5ff',  // Soft purple - borders
          300: '#d8b4fe',  // Medium light purple - hover states
          400: '#c084fc',  // Medium purple - secondary actions
          500: '#a855f7',  // Main purple - accent actions
          600: '#9333ea',  // Darker purple - active states
          700: '#7c3aed',  // Dark purple - text on light
          800: '#6b21a8',  // Very dark purple - headings
          900: '#581c87',  // Darkest purple - emphasis
        },
        
        // Neutral: Refined Grays - Clean, Structured, Professional
        neutral: {
          50: '#fafafa',   // Pure white alternative
          100: '#f5f5f5',  // Very light gray - backgrounds
          200: '#e5e5e5',  // Light gray - borders
          300: '#d4d4d4',  // Medium light gray - dividers
          400: '#a3a3a3',  // Medium gray - placeholder text
          500: '#737373',  // Base gray - secondary text
          600: '#525252',  // Dark gray - primary text
          700: '#404040',  // Very dark gray - headings
          800: '#262626',  // Darkest gray - emphasis
          900: '#171717',  // Near black - strong emphasis
        },
        
        // Success: Soft Green - Growth, Success, Positive
        success: {
          50: '#f0fdf4',   // Very light green
          100: '#dcfce7',  // Light green
          200: '#bbf7d0',  // Soft green
          300: '#86efac',  // Medium light green
          400: '#4ade80',  // Medium green
          500: '#22c55e',  // Main green
          600: '#16a34a',  // Darker green
          700: '#15803d',  // Dark green
          800: '#166534',  // Very dark green
          900: '#14532d',  // Darkest green
        },
        
        // Warning: Soft Amber - Attention, Caution, Warmth
        warning: {
          50: '#fffbeb',   // Very light amber
          100: '#fef3c7',  // Light amber
          200: '#fde68a',  // Soft amber
          300: '#fcd34d',  // Medium light amber
          400: '#fbbf24',  // Medium amber
          500: '#f59e0b',  // Main amber
          600: '#d97706',  // Darker amber
          700: '#b45309',  // Dark amber
          800: '#92400e',  // Very dark amber
          900: '#78350f',  // Darkest amber
        },
      },
      
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      
      spacing: {
        'section': '5rem',
        'container': '2rem',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      borderRadius: {
        'soft': '0.75rem',
        'soft-lg': '1rem',
        'soft-xl': '1.5rem',
        'soft-2xl': '2rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}