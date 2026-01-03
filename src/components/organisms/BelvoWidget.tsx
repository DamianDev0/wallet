import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { BELVO_REDIRECT_URL } from '@core/config/belvo.config';
import { useBelvoWidget } from './hooks/useBelvoWidget';

interface BelvoWidgetProps {
  accessToken: string;
  payload?: Record<string, string>;
  onSuccess: (linkId: string, institution: string) => void;
  onExit: () => void;
  onError: (error: string, errorMessage: string) => void;
}

const BelvoWidget: React.FC<BelvoWidgetProps> = ({
  accessToken,
  payload,
  onSuccess,
  onExit,
  onError,
}) => {
  const { uri, handleNavigationEvent } = useBelvoWidget({
    accessToken,
    payload,
    onSuccess,
    onExit,
    onError,
  });

  if (!uri) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri }}
      originWhitelist={[`${BELVO_REDIRECT_URL}://*`, 'https://*']}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      onShouldStartLoadWithRequest={handleNavigationEvent}
      onNavigationStateChange={handleNavigationEvent}
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
