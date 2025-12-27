import { useMemo } from 'react';
import { TextStyle } from 'react-native';


import { typography } from '@theme/config/typography';
import { BodyVariant, NumericVariant, TitleVariant, UIVariant } from '@theme/config/typography.types';

/**
 * Hook para acceder fácilmente a las variantes tipográficas
 *
 * @example
 * const { title, body, numeric, ui } = useTypography();
 *
 * <Text style={title('xxl')}>Título</Text>
 * <Text style={body('md')}>Texto</Text>
 * <Text style={numeric('xxl')}>$1,234</Text>
 */
export const useTypography = () => {
  return useMemo(() => ({
    // Acceso directo a títulos
    title: (variant: TitleVariant): TextStyle => typography.titles[variant],

    // Acceso directo a body
    body: (variant: BodyVariant): TextStyle => typography.body[variant],

    // Acceso directo a números
    numeric: (variant: NumericVariant): TextStyle => typography.numeric[variant],

    // Acceso directo a UI
    ui: (variant: UIVariant): TextStyle => typography.ui[variant],

    // Acceso a todo el sistema
    raw: typography,

    // Helper para crear estilos personalizados
    custom: (
      family: keyof typeof typography.families,
      weight: keyof typeof typography.families.poppins | keyof typeof typography.families.technor,
      size: keyof typeof typography.sizes,
      lineHeight?: keyof typeof typography.lineHeights,
    ): TextStyle => {
      const fontFamily = typography.families[family][weight as keyof typeof typography.families[typeof family]];
      const fontSize = typography.sizes[size];
      const lineHeightValue = lineHeight
        ? fontSize * typography.lineHeights[lineHeight]
        : fontSize * typography.lineHeights.normal;

      return {
        fontFamily: fontFamily as string,
        fontSize,
        lineHeight: lineHeightValue,
      };
    },
  }), []);
};

/**
 * Hook para obtener una variante específica de título
 *
 * @example
 * const titleStyle = useTitleStyle('xxl');
 * <Text style={titleStyle}>Título</Text>
 */
export const useTitleStyle = (variant: TitleVariant) => {
  return useMemo(() => typography.titles[variant], [variant]);
};

/**
 * Hook para obtener una variante específica de body
 *
 * @example
 * const bodyStyle = useBodyStyle('md');
 * <Text style={bodyStyle}>Texto</Text>
 */
export const useBodyStyle = (variant: BodyVariant) => {
  return useMemo(() => typography.body[variant], [variant]);
};

/**
 * Hook para obtener una variante específica de número
 *
 * @example
 * const numericStyle = useNumericStyle('xxl');
 * <Text style={numericStyle}>$1,234</Text>
 */
export const useNumericStyle = (variant: NumericVariant) => {
  return useMemo(() => typography.numeric[variant], [variant]);
};

/**
 * Hook para obtener una variante específica de UI
 *
 * @example
 * const buttonStyle = useUIStyle('button');
 * <Text style={buttonStyle}>Botón</Text>
 */
export const useUIStyle = (variant: UIVariant) => {
  return useMemo(() => typography.ui[variant], [variant]);
};
