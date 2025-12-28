import { useCallback } from 'react';
import { useLogin } from '@hooks/useAuth';
import { useToast } from '@contexts/ToastContext';

export const useLoginHandler = () => {
  const { mutate: login, isPending } = useLogin();
  const { showToast } = useToast();

  const handleLogin = useCallback(
    async (values: Record<string, any>) => {
      login(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (response) => {
            if ('data' in response) {
              showToast({
                type: 'success',
                title: 'Login Successful',
                message: `Welcome back, ${response.data.user.fullName}!`,
                position: 'top',
              });
              // Navigation logic can be added here
              // navigation.navigate('Home');
            }
          },
          onError: (error: any) => {
            showToast({
              type: 'error',
              title: 'Login Failed',
              message: error.response?.data?.message || 'Please check your credentials and try again.',
              position: 'top',
            });
          },
        }
      );
    },
    [login, showToast]
  );

  return {
    handleLogin,
    isPending,
  };
};
