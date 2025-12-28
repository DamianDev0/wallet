import React from 'react';
import { View, StyleSheet, Switch as RNSwitch, Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

interface SwitchProps {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export const Switch = ({ label, value, onChange, error, disabled }: SwitchProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        {label && (
          <Text variant="body-md" style={[styles.label, { opacity: disabled ? 0.5 : 1 }]}>
            {label}
          </Text>
        )}
        <RNSwitch
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={Platform.OS === 'android' ? theme.colors.white : undefined}
          ios_backgroundColor={theme.colors.border}
        />
      </View>
      {error && (
        <Text variant="caption" style={{ color: theme.colors.danger, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    marginRight: 12,
  },
});
