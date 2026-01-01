import { useCallback, useRef, useState } from 'react';
import { useWidgetToken, useLinkBankAccount } from '@hooks/useFinancial';
import { useToast } from '@contexts/ToastContext';
import useNavigationHook from '@hooks/use-navigation';
import { useAuthStore } from '@core/shared/store/auth.store';

export const useBankConnection = () => {
  const { user } = useAuthStore();
  const navigation = useNavigationHook();
  const { showToast } = useToast();
  const { mutate: getToken, isPending: isGettingToken } = useWidgetToken(user?.id || '');
  const { mutate: linkBank, isPending: isLinking } = useLinkBankAccount(user?.id || '');

  const [widgetToken, setWidgetToken] = useState<string | null>(null);
  const [showWidget, setShowWidget] = useState(false);
  const isProcessingRef = useRef(false);

  const handleGetWidgetToken = useCallback(() => {
    if (isProcessingRef.current || !user?.id) {
      return;
    }

    isProcessingRef.current = true;

    getToken(undefined, {
      onSuccess: (response) => {
        isProcessingRef.current = false;
        if ('access_token' in response) {
          setWidgetToken(response.access_token);
          setShowWidget(true);
        } else {
          showToast({
            type: 'error',
            title: 'Error',
            message: 'Could not get widget token',
            position: 'top',
            duration: 3000,
          });
        }
      },
      onError: (error: any) => {
        isProcessingRef.current = false;
        showToast({
          type: 'error',
          title: 'Error',
          message: error.response?.data?.message || 'Could not connect to Belvo',
          position: 'top',
          duration: 3000,
        });
      },
    });
  }, [user?.id, getToken, showToast]);

  const handleWidgetSuccess = useCallback(
    (linkId: string, institution: string) => {
      if (!user?.id) return;

      linkBank(
        { link_id: linkId },
        {
          onSuccess: (response) => {
            if ('success' in response && response.success) {
              showToast({
                type: 'success',
                title: 'Success!',
                message: `Your ${institution} account has been connected. Please log in to continue.`,
                position: 'top',
                duration: 3000,
              });
              setShowWidget(false);
              // Navegar a Login después de conectar el banco exitosamente
              navigation.navigate('Login');
            }
          },
          onError: (error: any) => {
            showToast({
              type: 'error',
              title: 'Link Failed',
              message: error.response?.data?.message || 'Could not link your bank account',
              position: 'top',
              duration: 3000,
            });
            setShowWidget(false);
          },
        }
      );
    },
    [user?.id, linkBank, showToast, navigation]
  );

  const handleWidgetExit = useCallback(() => {
    setShowWidget(false);
    showToast({
      type: 'info',
      title: 'Cancelled',
      message: 'Bank connection was cancelled',
      position: 'top',
      duration: 2000,
    });
  }, [showToast]);

  const handleWidgetError = useCallback(
    (error: string, errorMessage: string) => {
      setShowWidget(false);
      showToast({
        type: 'error',
        title: 'Connection Error',
        message: errorMessage || 'An error occurred while connecting your bank',
        position: 'top',
        duration: 3000,
      });
    },
    [showToast]
  );

  return {
    widgetToken,
    showWidget,
    isGettingToken,
    isLinking,
    handleGetWidgetToken,
    handleWidgetSuccess,
    handleWidgetExit,
    handleWidgetError,
  };
};
