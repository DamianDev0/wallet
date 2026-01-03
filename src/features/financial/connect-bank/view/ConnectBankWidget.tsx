import React from 'react';
import { View } from 'react-native';
import { Text, BelvoWidget } from '@components/index';
import { useTheme } from '@contexts/ThemeContext';
import { createStyles } from '@features/financial/styles/create.styles';

export const ConnectBankWidget = ({
  widgetToken,
  handleWidgetSuccess,
  handleWidgetExit,
  handleWidgetError,
}: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Text variant="title-lg">Connect Your Bank</Text>
      </View>

      <View style={styles.widgetContent}>
        <BelvoWidget
          accessToken={widgetToken}
          onSuccess={handleWidgetSuccess}
          onExit={handleWidgetExit}
          onError={handleWidgetError}
        />
      </View>
    </View>
  );
};
