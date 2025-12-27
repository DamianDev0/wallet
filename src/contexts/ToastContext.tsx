import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { ToastType } from '../components/molecules/Toast';

export interface ToastConfig {
  position: any;
  id: string;
  type: ToastType;
  title: string;
  message: string;
  progress?: number;
  duration?: number;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastContextType {
  toasts: ToastConfig[];
  showToast: (config: Omit<ToastConfig, 'id'>) => string;
  updateToast: (id: string, updates: Partial<ToastConfig>) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (config: Omit<ToastConfig, 'id'>): string => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastConfig = { ...config, id };

      setToasts(prev => [...prev, newToast]);

      if (config.duration && config.duration > 0) {
        const timeout = setTimeout(() => {
          hideToast(id);
        }, config.duration);
        timeoutRefs.current.set(id, timeout);
      }

      return id;
    },
    [hideToast]
  );

  const updateToast = useCallback((id: string, updates: Partial<ToastConfig>) => {
    setToasts(prev =>
      prev.map(toast => (toast.id === id ? { ...toast, ...updates } : toast))
    );
  }, []);

  const hideAllToasts = useCallback(() => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current.clear();
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, updateToast, hideToast, hideAllToasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
