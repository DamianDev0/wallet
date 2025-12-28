import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';

interface CheckboxProps {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export const Checkbox = ({ label, value, onChange, error, disabled }: CheckboxProps) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  const checkboxBackgroundColor = value ? theme.colors.primary : 'transparent';
  const checkboxBorderColor = error
    ? theme.colors.danger
    : value
    ? theme.colors.primary
    : theme.colors.border;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.checkboxContainer}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value, disabled }}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: checkboxBackgroundColor,
              borderColor: checkboxBorderColor,
              opacity: disabled ? 0.5 : 1,
            },
          ]}>
          {value && <Icon name="check" size={16} color={theme.colors.text} />}
        </View>
        {label && (
          <Text variant="body-md" style={[styles.label, { opacity: disabled ? 0.5 : 1 }]}>
            {label}
          </Text>
        )}
      </Pressable>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 12,
    flex: 1,
  },
});
