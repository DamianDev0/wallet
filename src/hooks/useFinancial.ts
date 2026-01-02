import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FinancialController } from '@core/infrastructure/controllers/financial.controller';
import { BankLinkRequest } from '@core/domain/entities/financial/bank-link';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';

const financialController = new FinancialController();

const QUERY_KEYS = {
  FINANCIAL: {
    WIDGET_TOKEN: (customerId: string) => ['financial', 'widget-token', customerId] as const,
    LINK_STATUS: (customerId: string) => ['financial', 'link-status', customerId] as const,
    ACCOUNTS: (customerId: string) => ['financial', 'accounts', customerId] as const,
    TRANSACTIONS: (customerId: string, dateFrom?: string, dateTo?: string) =>
      ['financial', 'transactions', customerId, dateFrom, dateTo] as const,
  },
} as const;


export const useWidgetToken = (customerId: string) => {
  return useMutation({
    mutationFn: () => financialController.getWidgetToken(customerId),
    onError: (error: ErrorResponse) => {
      console.error('Widget token error:', error.message);
    },
  });
};

export const useLinkBankAccount = (customerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BankLinkRequest) =>
      financialController.linkBankAccount(customerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FINANCIAL.LINK_STATUS(customerId)
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FINANCIAL.ACCOUNTS(customerId)
      });
    },
    onError: (error: ErrorResponse) => {
      console.error('Link bank account error:', error.message);
    },
  });
};

export const useUnlinkBankAccount = (customerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => financialController.unlinkBankAccount(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FINANCIAL.LINK_STATUS(customerId)
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FINANCIAL.ACCOUNTS(customerId)
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FINANCIAL.TRANSACTIONS(customerId)
      });
    },
    onError: (error: ErrorResponse) => {
      console.error('Unlink bank account error:', error.message);
    },
  });
};

export const useLinkStatus = (customerId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.FINANCIAL.LINK_STATUS(customerId),
    queryFn: async () => {
      const result = await financialController.getLinkStatus(customerId);

      if ('statusCode' in result && result.statusCode >= 400) {
        throw result;
      }

      return result;
    },
    enabled: enabled && !!customerId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAccounts = (customerId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.FINANCIAL.ACCOUNTS(customerId),
    queryFn: async () => {
      const result = await financialController.getAccounts(customerId);

      if ('statusCode' in result && result.statusCode >= 400) {
        throw result;
      }

      return result;
    },
    enabled: enabled && !!customerId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTransactions = (
  customerId: string,
  dateFrom?: string,
  dateTo?: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.FINANCIAL.TRANSACTIONS(customerId, dateFrom, dateTo),
    queryFn: async () => {
      const result = await financialController.getTransactions(customerId, dateFrom, dateTo);

      if ('statusCode' in result && result.statusCode >= 400) {
        throw result;
      }

      return result;
    },
    enabled: enabled && !!customerId,
    staleTime: 1000 * 60 * 2,
  });
};
