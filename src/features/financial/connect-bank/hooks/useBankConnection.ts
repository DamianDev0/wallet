import { useCallback, useRef, useState } from 'react';
import { useWidgetToken, useLinkBankAccount } from '@hooks/useFinancial';
import { useToast } from '@contexts/ToastContext';
import useNavigationHook from '@hooks/use-navigation';
import { useAuthStore } from '@core/shared/store/auth.store';

export const useBankConnection = () => {
  const { user, tempUser, clearAuth } = useAuthStore();
  const navigation = useNavigationHook();
  const { showToast } = useToast();
  const customerId = tempUser?.id || user?.id || '';

  const { mutate: getToken, isPending: isGettingToken } = useWidgetToken(customerId);
  const { mutate: linkBank, isPending: isLinking } = useLinkBankAccount(customerId);

  const [widgetToken, setWidgetToken] = useState<string | null>(null);
  const [showWidget, setShowWidget] = useState(false);
  const isProcessingRef = useRef(false);

  const handleGetWidgetToken = useCallback(() => {
    if (isProcessingRef.current || !customerId) return;

    isProcessingRef.current = true;

    getToken(undefined, {
      onSuccess: (response) => {
        isProcessingRef.current = false;

        if ('access' in response) {
          setWidgetToken(response.access);
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
  }, [customerId, getToken, showToast]);

  const handleWidgetSuccess = useCallback(
    (linkId: string, institution: string) => {
      if (!customerId) return;

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

              clearAuth();
              setShowWidget(false);
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
    [customerId, linkBank, showToast, navigation, clearAuth]
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
    (_error: string, errorMessage: string) => {
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
