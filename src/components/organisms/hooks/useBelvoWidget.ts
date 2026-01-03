import { useEffect, useState, useRef, useCallback } from 'react';
import { BELVO_DEFAULT_PAYLOAD, BELVO_REDIRECT_URL } from '@core/config/belvo.config';
import { URL } from 'react-native-url-polyfill';

interface UseBelvoWidgetProps {
  accessToken: string;
  payload?: Record<string, string>;
  onSuccess: (linkId: string, institution: string) => void;
  onExit: () => void;
  onError: (error: string, errorMessage: string) => void;
}

export const useBelvoWidget = ({
  accessToken,
  payload,
  onSuccess,
  onExit,
  onError,
}: UseBelvoWidgetProps) => {
  const [uri, setUri] = useState('');
  const successCalledRef = useRef(false);

  const buildPayload = useCallback((data: Record<string, string>) => {
    return Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
  }, []);

  useEffect(() => {
    const base = `https://widget.belvo.io/?access_token=${accessToken}`;
    const finalPayload = { ...BELVO_DEFAULT_PAYLOAD, ...payload };
    const url =
      Object.keys(finalPayload).length > 0
        ? `${base}&${buildPayload(finalPayload)}`
        : base;
    setUri(url);
  }, [accessToken, payload, buildPayload]);

  const handleNavigationEvent = useCallback(
    (event: any) => {
      const url = event.url || event.nativeEvent?.url;

      if (!url) {
        return true;
      }

      try {
        const parsed = new URL(url);
        const targetProtocol = `${BELVO_REDIRECT_URL}:`;

        if (parsed.protocol !== targetProtocol) {
          return true;
        }

        const params = Object.fromEntries(parsed.searchParams);
        const pathParts = parsed.pathname.split('/').filter(p => p);
        const action = pathParts.length > 0 ? pathParts[pathParts.length - 1] : parsed.hostname;

        if (action === 'success' || parsed.hostname === 'success') {
          const { link, institution } = params;

          if (link && institution && !successCalledRef.current) {
            successCalledRef.current = true;
            onSuccess(link, institution);
          }
          return false;
        }

        if (action === 'exit' || parsed.hostname === 'exit') {
          onExit();
          return false;
        }

        if (action === 'error' || parsed.hostname === 'error') {
          onError(
            params.error || 'unknown_error',
            params.error_message || 'Unknown error'
          );
          return false;
        }

        return false;
      } catch {
        return true;
      }
    },
    [onSuccess, onExit, onError]
  );

  return {
    uri,
    handleNavigationEvent,
  };
};
