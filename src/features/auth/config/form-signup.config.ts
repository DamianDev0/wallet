import { FormConfig, FieldConfig } from '@type/form.types';

export const signupFormFields: FieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    placeholder: 'Full Name',
    defaultValue: '',
    validations: [
      { type: 'required', message: 'Full name is required' },
      { type: 'minLength', value: 2, message: 'Full name must be at least 2 characters' },
    ],
    inputProps: {
      height: 48,
      autoCapitalize: 'words',
    },
  },
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

export const createSignUpFormConfig = (
  onSubmit: (values: Record<string, any>) => void | Promise<void>
): FormConfig => ({
  fields: signupFormFields,
  onSubmit,
  submitButtonText: 'Sign Up',
  submitButtonVariant: 'primary',
});
