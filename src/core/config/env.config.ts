import {
  API_URL,
  API_TIMEOUT,
  APP_NAME,
  APP_ENV,
  ENABLE_ANALYTICS,
  ENABLE_LOGGING,
} from '@env';

export const Config = {
  api: {
    url: API_URL || 'http://localhost:3000/api',
    timeout: parseInt(API_TIMEOUT || '30000', 10),
  },
  app: {
    name: APP_NAME || 'Wallet',
    env: APP_ENV || 'development',
  },
  features: {
    analytics: ENABLE_ANALYTICS === 'true',
    logging: ENABLE_LOGGING === 'true',
  },
  isDevelopment: APP_ENV === 'development',
  isProduction: APP_ENV === 'production',
} as const;
