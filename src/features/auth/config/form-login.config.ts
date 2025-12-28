import { FormConfig, FieldConfig } from '@type/form.types';

export const loginFormFields: FieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    defaultValue: '',
    validations: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email' },
    ],
    inputProps: {
      height: 48,
    },
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    defaultValue: '',
    validations: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', value: 6, message: 'Password must be at least 6 characters' },
    ],
    inputProps: {
      height: 48,
    },
  },
];

export const createLoginFormConfig = (
  onSubmit: (values: Record<string, any>) => void | Promise<void>
): FormConfig => ({
  fields: loginFormFields,
  onSubmit,
  submitButtonText: 'Login',
  submitButtonVariant: 'primary',
});
