/**
 * Belvo Widget Configuration
 *
 * Este archivo centraliza toda la configuración relacionada con Belvo Widget.
 * Incluye las URLs de callback, esquema de deep links, y configuración del widget.
 */

// Esquema de deep link para la app
export const BELVO_DEEP_LINK_SCHEME = 'myapp';

// Rutas base para callbacks
export const BELVO_CALLBACK_PATHS = {
  success: 'belvo/success',
  exit: 'belvo/exit',
  error: 'belvo/error',
  event: 'belvo/event',
} as const;

/**
 * Genera las URLs de callback completas para Belvo
 * Estas URLs deben configurarse en el backend al crear el widget token
 */
export const getBelvoCallbackUrls = () => ({
  success: `${BELVO_DEEP_LINK_SCHEME}://${BELVO_CALLBACK_PATHS.success}`,
  exit: `${BELVO_DEEP_LINK_SCHEME}://${BELVO_CALLBACK_PATHS.exit}`,
  event: `${BELVO_DEEP_LINK_SCHEME}://${BELVO_CALLBACK_PATHS.event}`,
});

/**
 * URL base para el redirectUrl del widget
 */
export const BELVO_REDIRECT_URL = BELVO_DEEP_LINK_SCHEME;

/**
 * Configuración por defecto del payload del widget
 */
export const BELVO_DEFAULT_PAYLOAD = {
  locale: 'es', // Idioma español
} as const;

/**
 * Tipos de eventos que puede emitir el widget
 */
export enum BelvoEventType {
  PAGE_LOAD = 'PAGE_LOAD',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  EXIT = 'EXIT',
}

/**
 * Información para configurar en el backend
 *
 * En tu backend de NestJS, debes actualizar la configuración del widget token
 * para usar estas URLs de callback:
 *
 * @example
 * ```typescript
 * // En tu servicio de Belvo (backend)
 * const widgetConfig = {
 *   widget: {
 *     callback_urls: {
 *       success: "myapp://belvo/success",
 *       exit: "myapp://belvo/exit",
 *       event: "myapp://belvo/event"
 *     },
 *     // ... resto de la configuración
 *   }
 * }
 * ```
 */
export const BACKEND_CONFIG_EXAMPLE = {
  callback_urls: getBelvoCallbackUrls(),
  note: 'Usar estas URLs en el backend al crear el widget token',
} as const;
