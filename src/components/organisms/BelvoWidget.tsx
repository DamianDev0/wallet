import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { URL } from 'react-native-url-polyfill';

interface BelvoWidgetProps {
  accessToken: string;
  payload?: Record<string, string>;
  redirectUrl: string;
  onSuccess: (linkId: string, institution: string) => void;
  onExit: () => void;
  onError: (error: string, errorMessage: string) => void;
}

const BelvoWidget: React.FC<BelvoWidgetProps> = ({
  accessToken,
  payload = {},
  redirectUrl,
  onSuccess,
  onExit,
  onError,
}) => {
  const [belvoUri, setBelvoUri] = useState('');

  useEffect(() => {
    const buildPayload = (data: Record<string, string>) =>
      Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');

    const baseUrl = `https://widget.belvo.io/?access_token=${accessToken}&redirect_url=${encodeURIComponent(
      redirectUrl,
    )}`;

    const finalUrl =
      Object.keys(payload).length > 0
        ? `${baseUrl}&${buildPayload(payload)}`
        : baseUrl;

    setBelvoUri(finalUrl);
  }, [accessToken, payload, redirectUrl]);

  const handleBelvoEvent = (event: any) => {
    const url = new URL(event.url);

    if (url.protocol === `${new URL(redirectUrl).protocol}`) {
      const params = Object.fromEntries(url.searchParams.entries());

      if (url.hostname === 'success') {
        const { link, institution } = params;
        if (link && institution) {
          onSuccess(link, institution);
        }
        return false;
      }

      if (url.hostname === 'exit') {
        onExit();
        return false;
      }

      if (url.hostname === 'error') {
        onError(params.error || 'unknown_error', params.error_message || 'Unknown error');
        return false;
      }

      return false;
    }

    return true;
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
        originWhitelist={[`${redirectUrl.split(':')[0]}://*`]}
        onShouldStartLoadWithRequest={handleBelvoEvent}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BelvoWidget;
