import { useCallback, useRef } from 'react';
import { useSignUp } from '@hooks/useAuth';
import { useToast } from '@contexts/ToastContext';
import useNavigationHook from '@hooks/use-navigation';
import { useAuthStore } from '@core/shared/store/auth.store';

export const useSignUpHandler = () => {
  const { mutate: signUp, isPending } = useSignUp();
  const { showToast } = useToast();
  const navigation = useNavigationHook();
  const { setTempUser } = useAuthStore();
  const isProcessingRef = useRef(false);

  const handleSignUp = useCallback(
    async (values: Record<string, any>) => {
      if (isProcessingRef.current || isPending) {
        return;
      }

      isProcessingRef.current = true;

      return new Promise<void>((resolve, reject) => {
        signUp(
          {
            fullName: values.fullName,
            email: values.email,
            password: values.password,
          },
          {
            onSuccess: (response) => {
              isProcessingRef.current = false;
     
              if ('data' in response && response.data) {
                setTempUser(response.data);

                showToast({
                  type: 'success',
                  title: 'Account Created',
                  message: 'Welcome! Let\'s connect your bank account.',
                  position: 'top',
                  duration: 3000,
                });

                navigation.navigate('ConnectBank');
                resolve();
              } else {
                reject();
              }
            },
            onError: (error: any) => {
              isProcessingRef.current = false;
              showToast({
                type: 'error',
                title: 'Sign Up Failed',
                message: error.response?.data?.message || 'Please try again.',
                position: 'top',
                duration: 3000,
              });
              reject(error);
            },
          }
        );
      });
    },
    [signUp, showToast, navigation, setTempUser, isPending]
  );

  return {
    handleSignUp,
    isPending,
  };
};
