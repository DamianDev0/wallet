import { TextInputProps } from 'react-native';

// Field types
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'switch' | 'select';

// Validation rules
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

// Field configuration
export interface FieldConfig {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  validations?: ValidationRule[];
  icon?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    onRightPress?: () => void;
  };
  options?: Array<{ label: string; value: any }>;
  inputProps?: Omit<TextInputProps, 'value' | 'onChangeText'> & {
    height?: number;
    placeholderSize?: number;
  };
  disabled?: boolean;
  hidden?: boolean;
}

// Form configuration
export interface FormConfig {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonVariant?: 'primary' | 'secondary' | 'outline';
}

// Form state
export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

// Form actions
export type FormAction =
  | { type: 'SET_VALUE'; payload: { name: string; value: any } }
  | { type: 'SET_ERROR'; payload: { name: string; error: string } }
  | { type: 'SET_TOUCHED'; payload: { name: string } }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM'; payload?: Record<string, any> };
