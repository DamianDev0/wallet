
const FONT_FAMILIES = {
  poppins: {
    thin: 'Poppins-Thin',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extraBold: 'Poppins-ExtraBold',
    black: 'Poppins-Black',
    blackItalic: 'Poppins-BlackItalic',
  },
  technor: {
    regular: 'Technor-Regular',
    medium: 'Technor-Medium',
    semiBold: 'Technor-Semibold',
  },
} as const;

const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
} as const;

const FONT_WEIGHTS = {
  thin: '100',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const typography = {
  families: FONT_FAMILIES,
  sizes: FONT_SIZES,
  weights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,

  // This is the title variant
  titles: {
    xxl: {
      fontFamily: FONT_FAMILIES.poppins.bold,
      fontSize: FONT_SIZES['4xl'],
      lineHeight: FONT_SIZES['4xl'] * LINE_HEIGHTS.tight,
    },
    xl: {
      fontFamily: FONT_FAMILIES.poppins.semiBold,
      fontSize: FONT_SIZES['3xl'],
      lineHeight: FONT_SIZES['3xl'] * LINE_HEIGHTS.tight,
    },
    lg: {
      fontFamily: FONT_FAMILIES.poppins.semiBold,
      fontSize: FONT_SIZES['2xl'],
      lineHeight: FONT_SIZES['2xl'] * LINE_HEIGHTS.tight,
    },
    md: {
      fontFamily: FONT_FAMILIES.poppins.semiBold,
      fontSize: FONT_SIZES.xl,
      lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.normal,
    },
    sm: {
      fontFamily: FONT_FAMILIES.poppins.semiBold,
      fontSize: FONT_SIZES.lg,
      lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.normal,
    },
  },

  // This is the body variant
  body: {
    lg: {
      fontFamily: FONT_FAMILIES.poppins.regular,
      fontSize: FONT_SIZES.lg,
      lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.relaxed,
    },
    md: {
      fontFamily: FONT_FAMILIES.poppins.regular,
      fontSize: FONT_SIZES.base,
      lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    },
    sm: {
      fontFamily: FONT_FAMILIES.poppins.regular,
      fontSize: FONT_SIZES.sm,
      lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    },
    xs: {
      fontFamily: FONT_FAMILIES.poppins.thin,
      fontSize: FONT_SIZES.xs,
      lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
    },
  },

  // This is the numeric variant
  numeric: {
    xxl: {
      fontFamily: FONT_FAMILIES.technor.semiBold,
      fontSize: FONT_SIZES['5xl'],
      lineHeight: FONT_SIZES['5xl'] * LINE_HEIGHTS.tight,
    },
    xl: {
      fontFamily: FONT_FAMILIES.technor.medium,
      fontSize: FONT_SIZES['2xl'],
      lineHeight: FONT_SIZES['2xl'] * LINE_HEIGHTS.tight,
    },
    lg: {
      fontFamily: FONT_FAMILIES.technor.medium,
      fontSize: FONT_SIZES.lg,
      lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.normal,
    },
    md: {
      fontFamily: FONT_FAMILIES.technor.regular,
      fontSize: FONT_SIZES.base,
      lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    },
    sm: {
      fontFamily: FONT_FAMILIES.technor.regular,
      fontSize: FONT_SIZES.sm,
      lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    },
  },

  // Variantes para UI elements (botones, labels, etc)
  ui: {
    button: {
      fontFamily: FONT_FAMILIES.poppins.semiBold,
      fontSize: FONT_SIZES.base,
      lineHeight: FONT_SIZES.base * LINE_HEIGHTS.tight,
    },
    label: {
      fontFamily: FONT_FAMILIES.poppins.medium,
      fontSize: FONT_SIZES.sm,
      lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    },
    caption: {
      fontFamily: FONT_FAMILIES.poppins.regular,
      fontSize: FONT_SIZES.xs,
      lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
    },
  },
} as const; 