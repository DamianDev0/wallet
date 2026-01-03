import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { URL } from 'react-native-url-polyfill';
import { BELVO_DEFAULT_PAYLOAD, BELVO_REDIRECT_URL, BelvoEventType } from '@core/config/belvo.config';

interface BelvoWidgetProps {
  accessToken: string;
  payload?: Record<string, string>;
  onSuccess: (linkId: string, institution: string) => void;
  onExit: () => void;
  onError: (error: string, errorMessage: string) => void;
  onEvent?: (eventName: string, metadata: any) => void;
}

const BelvoWidget: React.FC<BelvoWidgetProps> = ({
  accessToken,
  payload,
  onSuccess,
  onExit,
  onError,
  onEvent,
}) => {
  const [uri, setUri] = useState('');
  const [connectionTimestamp, setConnectionTimestamp] = useState<number | null>(null);
  const successCalledRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const buildPayload = (data: Record<string, string>) =>
    Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

  useEffect(() => {
    const base = `https://widget.belvo.io/?access_token=${accessToken}`;
    const finalPayload = { ...BELVO_DEFAULT_PAYLOAD, ...payload };
    const url =
      Object.keys(finalPayload).length > 0
        ? `${base}&${buildPayload(finalPayload)}`
        : base;
    setUri(url);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [accessToken, payload]);

  const handleBelvoEvent = (event: any) => {
    const url = event.url || event.nativeEvent?.url;

    if (!url) {
      return true;
    }

    try {
      const parsed = new URL(url);
      const targetProtocol = `${BELVO_REDIRECT_URL}:`;

      if (parsed.protocol === targetProtocol) {
        const params = Object.fromEntries(parsed.searchParams);
        const pathParts = parsed.pathname.split('/').filter(p => p);
        const action = pathParts.length > 0 ? pathParts[pathParts.length - 1] : parsed.hostname;

        if (action === 'success' || parsed.hostname === 'success') {
          const { link, institution } = params;

          if (link && institution && !successCalledRef.current) {
            successCalledRef.current = true;

            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }

            onSuccess(link, institution);
          }
          return false;
        }

        if (action === 'exit' || parsed.hostname === 'exit') {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          onExit();
          return false;
        }

        if (action === 'error' || parsed.hostname === 'error') {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          onError(
            params.error || 'unknown_error',
            params.error_message || 'Unknown error',
          );
          return false;
        }

        return false;
      }

      return true;
    } catch {
      return true;
    }
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const rawData = JSON.parse(event.nativeEvent.data);

      if (rawData.type === 'INTERCEPTED' || rawData.type === 'MESSAGE_EVENT') {
        let belvoData = rawData.data;

        if (belvoData && typeof belvoData === 'object' && belvoData.data) {
          belvoData = belvoData.data;
        }

        if (typeof belvoData === 'string') {
          try {
            const parsed = JSON.parse(belvoData);
            handleBelvoMessage(parsed);
          } catch {
            handleBelvoMessage(belvoData);
          }
        } else if (belvoData && typeof belvoData === 'object') {
          handleBelvoMessage(belvoData);
        }
        return;
      }

      handleBelvoMessage(rawData);
    } catch {
      return;
    }
  };

  const handleBelvoMessage = (data: any) => {
    const eventName = data.eventName || data.event;
    const metadata = data.meta_data || data.metadata || {};

    if (eventName && onEvent) {
      onEvent(eventName, metadata);
    }

    const isSuccess =
      eventName === 'SUCCESS' ||
      eventName === BelvoEventType.SUCCESS ||
      eventName === 'CONSENT_CREATED' ||
      eventName === 'LINK_CREATED' ||
      metadata.page === '/success' ||
      (metadata.from && metadata.from.includes('success'));

    if (isSuccess) {
      const linkId = metadata.link || metadata.link_id || metadata.consent_id || metadata.id;
      const institution = metadata.institution || metadata.institution_name;

      if (linkId && !successCalledRef.current) {
        successCalledRef.current = true;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        onSuccess(linkId, institution || 'Unknown Bank');
      }
      return;
    }

    if (eventName === 'PAGE_LOAD' && metadata.page === '/connection' && !successCalledRef.current) {
      if (!connectionTimestamp) {
        setConnectionTimestamp(Date.now());

        timeoutRef.current = setTimeout(() => {
          if (!successCalledRef.current) {
            successCalledRef.current = true;
            onExit();
          }
        }, 5000);
      }
    }

    if (eventName === 'EXIT' || eventName === BelvoEventType.EXIT) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      onExit();
      return;
    }

    if (eventName === 'ERROR' || eventName === BelvoEventType.ERROR) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      onError(
        metadata.error || 'unknown_error',
        metadata.error_message || metadata.message || 'An error occurred'
      );
      return;
    }
  };

  if (!uri) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const injectedJavaScript = `
    (function() {
      const originalPostMessage = window.parent.postMessage;
      window.parent.postMessage = function(message, targetOrigin) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'INTERCEPTED',
          data: message
        }));
        return originalPostMessage.apply(this, arguments);
      };

      window.addEventListener('message', function(event) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'MESSAGE_EVENT',
          data: event.data
        }));
      });

      true;
    })();
  `;

  return (
    <WebView
      source={{ uri }}
      originWhitelist={[`${BELVO_REDIRECT_URL}://*`, 'https://*']}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      injectedJavaScript={injectedJavaScript}
      onShouldStartLoadWithRequest={handleBelvoEvent}
      onNavigationStateChange={handleBelvoEvent}
      onMessage={handleWebViewMessage}
      renderLoading={() => (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BelvoWidget;
