import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormConfig, FieldConfig } from '@type/form.types';
import { useForm } from '@hooks/useForm';
import { Input } from '../molecules/Input';
import { Checkbox } from '../molecules/Checkbox';
import { Switch } from '../molecules/Switch';
import { Select } from '../molecules/Select';
import { Button } from '../molecules/Button';

interface FormProps {
  config: FormConfig;
  spacing?: number;
}

export const Form = ({ config, spacing = 16 }: FormProps) => {
  const { fields, onSubmit, submitButtonText = 'Submit', submitButtonVariant = 'primary' } = config;

  const { getFieldProps, handleSubmit, isSubmitting } = useForm(fields);

  const renderField = (field: FieldConfig) => {
    if (field.hidden) return null;

    const fieldProps = getFieldProps(field.name);

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={fieldProps.value}
            onChangeText={fieldProps.onChange}
            onBlur={fieldProps.onBlur}
            error={fieldProps.error}
            leftIcon={field.icon?.left}
            rightIcon={field.icon?.right}
            onRightIconPress={field.icon?.onRightPress}
            secureTextEntry={field.type === 'password'}
            keyboardType={
              field.type === 'email'
                ? 'email-address'
                : field.type === 'number'
                ? 'numeric'
                : 'default'
            }
            autoCapitalize={field.type === 'email' ? 'none' : undefined}
            editable={!field.disabled}
            {...field.inputProps}
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            key={field.name}
            label={field.label}
            value={fieldProps.value}
            onChange={fieldProps.onChange}
            error={fieldProps.error}
            disabled={field.disabled}
          />
        );

      case 'switch':
        return (
          <Switch
            key={field.name}
            label={field.label}
            value={fieldProps.value}
            onChange={fieldProps.onChange}
            error={fieldProps.error}
            disabled={field.disabled}
          />
        );

      case 'select':
        return (
          <Select
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={fieldProps.value}
            onChange={fieldProps.onChange}
            options={field.options || []}
            error={fieldProps.error}
            disabled={field.disabled}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.fieldsContainer, { gap: spacing }]}>
        {fields.map(field => renderField(field))}
      </View>

      <Button
        title={submitButtonText}
        variant={submitButtonVariant}
        fullWidth
        size="lg"
        onPress={() => handleSubmit(onSubmit)}
        disabled={isSubmitting}
        loading={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  fieldsContainer: {
    marginBottom: 24,
  },
});
