import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: InputProps) => {
  const { theme, isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  let borderColor = 'transparent';
  if (error) {
    borderColor = theme.colors.danger;
  } else if (isFocused) {
    borderColor = theme.colors.primary;
  }

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="caption" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7',
            borderColor: borderColor,
          },
        ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.families.poppins.regular,
              fontSize: theme.typography.sizes.base,
            },
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={isDark ? '#8E8E93' : '#A3A3A3'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}>
            {rightIcon}
          </Pressable>
        )}
      </View>
      {error && (
        <Text variant="caption" style={{ color: theme.colors.danger }}>
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
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
  inputWithLeftIcon: {
    marginLeft: 8,
  },
  inputWithRightIcon: {
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 4,
  },
  rightIcon: {
    marginLeft: 4,
  },
});
