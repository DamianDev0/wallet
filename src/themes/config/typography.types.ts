import type { typography } from './typography';

export type FontFamily = keyof typeof typography.families;
export type FontSize = keyof typeof typography.sizes;
export type FontWeight = keyof typeof typography.weights;
export type LineHeight = keyof typeof typography.lineHeights;

export type TitleVariant = keyof typeof typography.titles;
export type BodyVariant = keyof typeof typography.body;
export type NumericVariant = keyof typeof typography.numeric;
export type UIVariant = keyof typeof typography.ui;

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export type Typography = typeof typography;
