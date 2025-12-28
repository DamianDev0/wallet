/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';

interface SelectOption {
  label: string;
  value: any;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
}

export const Select = ({
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  options,
  error,
  disabled,
}: SelectProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (optionValue: any) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const borderColor = error ? theme.colors.danger : theme.colors.border;

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="caption" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <Pressable
        style={[
          styles.selectButton,
          {
            backgroundColor: theme.colors.surface,
            borderColor,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}>
        <Text
          variant="body-md"
          style={{
            color: selectedOption ? theme.colors.text : theme.colors.textSecondary,
          }}>
          {displayText}
        </Text>
        <Icon
          name="chevron-down"
          size={20}
          color={theme.colors.textSecondary}
        />
      </Pressable>
      {error && (
        <Text variant="caption" style={{ color: theme.colors.danger, marginTop: 4 }}>
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background },
            ]}>
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: theme.colors.border },
              ]}>
              <Text variant="title-sm" weight="semiBold">
                {label || 'Select'}
              </Text>
              <Pressable onPress={() => setIsOpen(false)}>
                <Icon name="close" size={24} color={theme.colors.text} />
              </Pressable>
            </View>
            <ScrollView style={styles.optionsList}>
              {options.map((option, index) => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.optionItem,
                      {
                        backgroundColor: isSelected
                          ? theme.colors.primary
                          : 'transparent',
                      },
                    ]}
                    onPress={() => handleSelect(option.value)}>
                    <Text
                      variant="body-md"
                      weight={isSelected ? 'semiBold' : 'regular'}
                      style={{
                        color: isSelected ? theme.colors.primary : theme.colors.text,
                      }}>
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Icon name="check" size={20} color={theme.colors.primary} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '70%',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
});
