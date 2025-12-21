export const typography = {
  fonts: {
    system: 'System',
    boxing: 'Boxing-Regular',
  },

  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    title: 32,
  },

weights: {
    regular: 400, 
    medium: 500,
    bold: 700,
  },

 variants: {
    body: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: 400,
    },
    heading: {
      fontFamily: 'System',
      fontSize: 24,
      fontWeight: 700,
    },
    title: {
      fontFamily: 'Boxing-Regular',
      fontSize: 32,
      fontWeight: 400,
    },
  },
} as const; 