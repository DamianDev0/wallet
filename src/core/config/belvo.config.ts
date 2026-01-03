export const BELVO_DEEP_LINK_SCHEME = 'myapp';

export const BELVO_CALLBACK_PATHS = {
  success: 'belvo/success',
  exit: 'belvo/exit',
  error: 'belvo/error',
  event: 'belvo/event',
} as const;

export const getBelvoCallbackUrls = () => ({
  success: `${BELVO_DEEP_LINK_SCHEME}://${BELVO_CALLBACK_PATHS.success}`,
  exit: `${BELVO_DEEP_LINK_SCHEME}://${BELVO_CALLBACK_PATHS.exit}`,
  event: `${BELVO_DEEP_LINK_SCHEME}://${BELVO_CALLBACK_PATHS.event}`,
});

export const BELVO_REDIRECT_URL = BELVO_DEEP_LINK_SCHEME;

export const BELVO_DEFAULT_PAYLOAD = {
  locale: 'es',
} as const;

export enum BelvoEventType {
  PAGE_LOAD = 'PAGE_LOAD',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  EXIT = 'EXIT',
}


