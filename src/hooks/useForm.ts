import { useReducer, useCallback } from 'react';
import { FormState, FormAction, FieldConfig } from '@type/form.types';
import { FormValidator } from '@utils/validators';

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.name]: action.payload.error,
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.name]: true,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'RESET_FORM':
      return {
        values: action.payload || {},
        errors: {},
        touched: {},
        isSubmitting: false,
      };
    default:
      return state;
  }
};

const getInitialValues = (fields: FieldConfig[]): Record<string, any> => {
  const initialValues: Record<string, any> = {};
  fields.forEach(field => {
    initialValues[field.name] = field.defaultValue ?? '';
  });
  return initialValues;
};

export const useForm = (fields: FieldConfig[]) => {
  const initialState: FormState = {
    values: getInitialValues(fields),
    errors: {},
    touched: {},
    isSubmitting: false,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const validateField = useCallback(
    (name: string, value: any): string | null => {
      const field = fields.find(f => f.name === name);
      if (!field || !field.validations) return null;

      return FormValidator.validate(value, field.validations);
    },
    [fields]
  );

  const validateAllFields = useCallback((): Record<string, string> => {
    const errors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.hidden) return;

      const error = validateField(field.name, state.values[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    });

    return errors;
  }, [fields, state.values, validateField]);

  const setValue = useCallback((name: string, value: any) => {
    dispatch({ type: 'SET_VALUE', payload: { name, value } });

    const error = validateField(name, value);
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: { name, error } });
    } else {
      dispatch({ type: 'SET_ERROR', payload: { name, error: '' } });
    }
  }, [validateField]);

  const setTouched = useCallback((name: string) => {
    dispatch({ type: 'SET_TOUCHED', payload: { name } });
  }, []);

  const handleSubmit = useCallback(
    async (onSubmit: (values: Record<string, any>) => void | Promise<void>) => {
      const errors = validateAllFields();

      if (Object.keys(errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', payload: errors });

        const touchedFields: Record<string, boolean> = {};
        fields.forEach(field => {
          touchedFields[field.name] = true;
        });
        Object.keys(touchedFields).forEach(name => {
          dispatch({ type: 'SET_TOUCHED', payload: { name } });
        });

        return;
      }

      dispatch({ type: 'SET_SUBMITTING', payload: true });

      try {
        await onSubmit(state.values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false });
      }
    },
    [fields, state.values, validateAllFields]
  );

  const reset = useCallback((newValues?: Record<string, any>) => {
    dispatch({ type: 'RESET_FORM', payload: newValues || getInitialValues(fields) });
  }, [fields]);

  const getFieldProps = useCallback(
    (name: string) => {
      return {
        value: state.values[name],
        error: state.touched[name] ? state.errors[name] : undefined,
        onChange: (value: any) => setValue(name, value),
        onBlur: () => setTouched(name),
      };
    },
    [state.values, state.errors, state.touched, setValue, setTouched]
  );

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setValue,
    setTouched,
    handleSubmit,
    reset,
    getFieldProps,
  };
};
