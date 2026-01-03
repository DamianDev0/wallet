import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { URL } from 'react-native-url-polyfill';
import {
  BELVO_REDIRECT_URL,
  BELVO_DEFAULT_PAYLOAD,
  BelvoEventType,
} from '@core/config/belvo.config';

interface BelvoWidgetProps {
  accessToken: string;
  payload?: Record<string, string>;
  redirectUrl?: string;
  onSuccess: (linkId: string, institution: string) => void;
  onExit: () => void;
  onError: (error: string, errorMessage: string) => void;
  onEvent?: (eventName: string, metadata: any) => void;
}

const BelvoWidget: React.FC<BelvoWidgetProps> = ({
  accessToken,
  payload,
  redirectUrl = BELVO_REDIRECT_URL,
  onSuccess,
  onExit,
  onError,
  onEvent,
}) => {
  const [belvoUri, setBelvoUri] = useState('');

  // Construye el payload
  const buildPayload = (data: Record<string, string>) =>
    Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

  useEffect(() => {
    const baseUrl = `https://widget.belvo.io/?access_token=${accessToken}`;

    // Combina el payload por defecto con el payload personalizado
    const finalPayload = { ...BELVO_DEFAULT_PAYLOAD, ...payload };

    const finalUrl =
      Object.keys(finalPayload).length > 0
        ? `${baseUrl}&${buildPayload(finalPayload)}`
        : baseUrl;

    setBelvoUri(finalUrl);
  }, [accessToken, payload]);

  const handleBelvoEvent = (event: any) => {
    try {
      const webviewEvent = new URL(event.url);

      // Verificar si la URL usa nuestro esquema personalizado
      if (webviewEvent.protocol === `${redirectUrl}:`) {
        const parseParams = Object.fromEntries(webviewEvent.searchParams);

        switch (webviewEvent.hostname) {
          case 'success':
            const { link, institution } = parseParams;
            if (link && institution) {
              console.log('[BelvoWidget] Success:', { link, institution });
              onSuccess(link, institution);
            }
            return false;

          case 'exit':
            console.log('[BelvoWidget] Exit');
            onExit();
            return false;

          case 'error':
            const { error, error_message } = parseParams;
            console.log('[BelvoWidget] Error:', { error, error_message });
            onError(error || 'unknown_error', error_message || 'Unknown error');
            return false;
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error('[BelvoWidget] Error handling Belvo event:', error);
      return true;
    }
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('[BelvoWidget] Message received:', data);

      if (data.eventName && onEvent) {
        onEvent(data.eventName, data.metadata || data.meta_data);
      }

      // Manejar eventos específicos
      if (data.eventName === BelvoEventType.ERROR) {
        const { error_code, error_message, institution_name } = data.meta_data || {};
        console.log('[BelvoWidget] Error event:', {
          error_code,
          error_message,
          institution_name,
        });
      } else if (data.eventName === BelvoEventType.PAGE_LOAD) {
        const { page, from, institution_name } = data.metadata || {};
        console.log('[BelvoWidget] Page load:', {
          page,
          from,
          institution_name,
        });
      }
    } catch (error) {
      console.error('[BelvoWidget] Error parsing message:', error);
    }
  };

  if (!belvoUri) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: belvoUri }}
        originWhitelist={[`${redirectUrl}://*`]}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        onShouldStartLoadWithRequest={handleBelvoEvent}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BelvoWidget;
