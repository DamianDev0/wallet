import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { URL } from 'react-native-url-polyfill';

interface BelvoWidgetProps {
  accessToken: string;
  onSuccess: (linkId: string, institution: string) => void;
  onExit: () => void;
  onError: (error: string, errorMessage: string) => void;
  callbackUrl?: string;
  locale?: string;
  institution?: string;
}

const BelvoWidget: React.FC<BelvoWidgetProps> = ({
  accessToken,
  onSuccess,
  onExit,
  onError,
  callbackUrl = 'myapp://belvo',
  locale = 'es',
  institution,
}) => {
  const [widgetUri, setWidgetUri] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buildWidgetUrl = () => {
      const baseUrl = `https://widget.belvo.io/?access_token=${accessToken}`;
      const params = new URLSearchParams({
        callback: callbackUrl,
        locale,
      });

      if (institution) {
        params.append('institution', institution);
      }

      return `${baseUrl}&${params.toString()}`;
    };

    setWidgetUri(buildWidgetUrl());
  }, [accessToken, callbackUrl, locale, institution]);

  const handleBelvoEvent = (event: any): boolean => {
    try {
      const webviewEvent = new URL(event.url);

      if (webviewEvent.protocol === 'myapp:') {
        const parseParams = Object.fromEntries(webviewEvent.searchParams);

        switch (webviewEvent.hostname) {
          case 'success':
            const { link, institution: inst } = parseParams;
            if (link && inst) {
              onSuccess(link, inst);
            }
            return false;

          case 'exit':
            onExit();
            return false;

          case 'error':
            const { error, error_message } = parseParams;
            onError(error || 'Unknown error', error_message || 'An error occurred');
            return false;

          default:
            return true;
        }
      }
      return true;
    } catch (error) {
      console.error('Error handling Belvo event:', error);
      return true;
    }
  };

  if (!widgetUri) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: widgetUri }}
        originWhitelist={['myapp://*']}
        onShouldStartLoadWithRequest={handleBelvoEvent}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066FF" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default BelvoWidget;
