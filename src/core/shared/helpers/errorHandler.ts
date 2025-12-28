import { AxiosError } from 'axios';
import { ErrorResponse } from '../interfaces/error-response.interface';

export const handleApiError = (error: unknown): ErrorResponse => {
  if (error instanceof AxiosError) {
    const response = error.response?.data;

    return {
      code: error.response?.status || 500,
      message: response?.message || error.message || 'An unexpected error occurred',
      errors: response?.errors,
    };
  }

  return {
    code: 500,
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
  };
};
