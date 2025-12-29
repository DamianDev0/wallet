import { useCallback, useRef } from 'react';
import { useLogin } from '@hooks/useAuth';
import { useToast } from '@contexts/ToastContext';

export const useLoginHandler = () => {
  const { mutate: login, isPending } = useLogin();
  const { showToast } = useToast();
  const isProcessingRef = useRef(false);

  const handleLogin = useCallback(
    async (values: Record<string, any>) => {
      if (isProcessingRef.current || isPending) {
        return;
      }

      isProcessingRef.current = true;

      return new Promise<void>((resolve, reject) => {
        login(
          {
            email: values.email,
            password: values.password,
          },
          {
            onSuccess: (response) => {
              isProcessingRef.current = false;
              if ('data' in response) {
                showToast({
                  type: 'success',
                  title: 'Login Successful',
                  message: 'Welcome back!',
                  position: 'top',
                  duration: 3000,
                });
                resolve();
              } else {
                reject();
              }
            },
            onError: (error: any) => {
              isProcessingRef.current = false;
              showToast({
                type: 'error',
                title: 'Login Failed',
                message: error.response?.data?.message || 'Please check your credentials and try again.',
                position: 'top',
                duration: 3000,
              });
              reject(error);
            },
          }
        );
      });
    },
    [login, showToast, isPending]
  );

  return {
    handleLogin,
    isPending,
  };
};
