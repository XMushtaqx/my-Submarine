import { keyframes } from 'styled-components';

// 1. Define Keyframes as proper styled-components objects
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// 2. The Main Theme Configuration
export const oceanTheme = {
  colors: {
    abyss: '#0a0e17',
    midnightBlue: '#0c1a3a',
    deepBlue: '#122a5e',
    oceanBlue: '#0d1b36',
    seaBlue: '#1a3a6b',
    cyan: '#4da6ff',
    aqua: '#2a75b8',
    lightBlue: '#8abaff',
    skyBlue: '#a0c8ff',
    starGold: '#ffd700',
    starSilver: '#c0c0c0',
    starWhite: '#ffffff',
    textPrimary: '#e6f0ff',
    textSecondary: '#a0c8ff',
    textMuted: '#6b8bc9',
    glassBg: 'rgba(15, 35, 80, 0.25)',
    glassBorder: 'rgba(77, 166, 255, 0.25)',
    glassHover: 'rgba(25, 60, 120, 0.4)',
    gradientPrimary: 'linear-gradient(165deg, #0a0e17 0%, #0c1a3a 45%, #122a5e 75%, #0d1b36 100%)',
    gradientAccent: 'linear-gradient(45deg, #0d4a6b, #1a5da8, #0d4a6b)',
    gradientGlow: 'linear-gradient(to right, #4da6ff, #a0c8ff)',
  },
  
  glassmorphism: {
    base: {
      background: 'rgba(15, 35, 80, 0.25)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(77, 166, 255, 0.25)',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0, 15, 45, 0.6)',
    },
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 15, 45, 0.8)',
    },
    card: {
      background: 'rgba(20, 45, 100, 0.3)',
      border: '1px solid rgba(77, 166, 255, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
    },
  },
  
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      heading: "'Montserrat', sans-serif",
    },
    sizes: {
      h1: '2.5rem', h2: '2rem', h3: '1.5rem', h4: '1.25rem',
      body: '1rem', small: '0.875rem',
    },
    weights: {
      light: 300, regular: 400, medium: 500,
      semibold: 600, bold: 700, extrabold: 800,
    },
  },
  
  spacing: {
    xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem', '2xl': '4rem',
  },
  
  animations: {
    duration: { fast: '150ms', normal: '300ms', slow: '500ms' },
    easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', easeInOut: 'ease-in-out' },
    keyframes: {
      float,
      pulse,
      twinkle,
      shimmer
    },
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0, 15, 45, 0.3)',
    md: '0 4px 12px rgba(0, 15, 45, 0.4)',
    lg: '0 8px 24px rgba(0, 15, 45, 0.5)',
    xl: '0 12px 40px rgba(0, 15, 45, 0.6)',
    glow: '0 0 30px rgba(77, 166, 255, 0.3)',
  },
  
  borders: {
    radius: { sm: '8px', md: '16px', lg: '24px', xl: '32px', full: '9999px' },
    width: { thin: '1px', medium: '2px', thick: '3px' },
  },
};

// Dark and Light variants
export const darkTheme = {
  ...oceanTheme,
  mode: 'dark',
};

export const lightTheme = {
  ...oceanTheme,
  mode: 'light',
  colors: {
    ...oceanTheme.colors,
    textPrimary: '#0a0e17',
    textSecondary: '#1a3a6b',
    glassBg: 'rgba(255, 255, 255, 0.8)',
  },
};

export default oceanTheme;