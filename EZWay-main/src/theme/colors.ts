export const colors = {
  // Primary gradients
  primaryGradient: ['#AEE6F8', '#C1F7DC'] as const,
  secondaryGradient: ['#D4C4F7', '#C2D8FF'] as const,
  accentGradient: ['#FFB5A7', '#D4C4F7'] as const,
  
  // Card gradients
  cardGradient1: ['rgba(174, 230, 248, 0.15)', 'rgba(193, 247, 220, 0.15)'] as const,
  cardGradient2: ['rgba(212, 196, 247, 0.15)', 'rgba(194, 216, 255, 0.15)'] as const,
  
  // Brand colors
  brand: {
    primary: '#2D2E5E',    // Deep Navy
    secondary: '#AEE6F8',  // Soft Sky Blue
    accent: '#FFB5A7',     // Coral Peach
  },
  
  // Text colors
  text: {
    primary: '#2D2E5E',
    secondary: '#4A4B7C',
    muted: '#6E6F9F',
    accent: '#FFB5A7',
    light: '#FFFFFF',
    dark: {
      primary: '#ECEDEE',
      secondary: '#B4B6C1',
      muted: '#8A8C9A',
      accent: '#FFB5A7',
      light: '#FFFFFF',
    }
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    card: '#FFFFFF',
    elevated: '#F1F5F9',
    dark: {
      primary: '#1A1B2E',
      secondary: '#23243D',
      card: '#2D2E5E',
      elevated: '#3A3B6E',
    }
  },
  
  // Border colors
  border: {
    light: 'rgba(45, 46, 94, 0.1)',
    accent: 'rgba(212, 196, 247, 0.3)',
    dark: {
      light: 'rgba(236, 237, 238, 0.1)',
      accent: 'rgba(212, 196, 247, 0.3)',
    }
  },

  // Utility colors
  success: '#C1F7DC',
  error: '#FFB5A7',
  warning: '#FFE5A7',
  info: '#AEE6F8',

  // Component specific
  nav: {
    active: '#2D2E5E',
    inactive: '#6E6F9F',
    background: '#FFFFFF',
    dark: {
      active: '#ECEDEE',
      inactive: '#8A8C9A',
      background: '#1A1B2E',
    }
  },
}; 