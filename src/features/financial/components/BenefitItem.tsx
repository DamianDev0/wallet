import React from 'react';
import { View } from 'react-native';
import { Text } from '@components/index';
import { useTheme } from '@contexts/ThemeContext';
import { createStyles } from '../styles/create.styles';
import { Check } from 'lucide-react-native';

export const BenefitItem = ({ text }: { text: string }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.benefitItem}>
      <View style={styles.benefitIcon}>
        <Check
          size={14}
          strokeWidth={2.5}
          color={theme.colors.success}
        />
      </View>

      <Text variant="body-sm" style={styles.benefitText}>
        {text}
      </Text>
    </View>
  );
};
