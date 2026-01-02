import apiUrl from '@core/config/api-url';
import { WidgetToken, WidgetTokenResponse } from '@core/domain/entities/financial/widget-token';
import { BelvoCredentials, BelvoCredentialsResponse } from '@core/domain/entities/financial/belvo-credentials';
import { BankLinkRequest, BankLinkResponse } from '@core/domain/entities/financial/bank-link';
import { LinkStatus } from '@core/domain/entities/financial/link-status';
import { Account } from '@core/domain/entities/financial/account';
import { Transaction } from '@core/domain/entities/financial/transaction';
import { handleApiError } from '@core/shared/helpers/errorHandler';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';

const financialService = {
  async getBelvoCredentials(customerId: string): Promise<BelvoCredentials | ErrorResponse> {
    try {
      const response = await apiUrl.get<BelvoCredentialsResponse>(
        `/customers/${customerId}/financial/belvo-credentials`
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getWidgetToken(customerId: string): Promise<WidgetToken | ErrorResponse> {
    try {
      const response = await apiUrl.post<WidgetTokenResponse>(
        `/customers/${customerId}/financial/widget-token`
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async linkBankAccount(
    customerId: string,
    data: BankLinkRequest
  ): Promise<BankLinkResponse | ErrorResponse> {
    try {
      const response = await apiUrl.post<BankLinkResponse>(
        `/customers/${customerId}/financial/link`,
        data
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async unlinkBankAccount(customerId: string): Promise<void | ErrorResponse> {
    try {
      await apiUrl.delete(`/customers/${customerId}/financial/unlink`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getLinkStatus(customerId: string): Promise<LinkStatus | ErrorResponse> {
    try {
      const response = await apiUrl.get<LinkStatus>(
        `/customers/${customerId}/financial/status`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getAccounts(customerId: string): Promise<Account[] | ErrorResponse> {
    try {
      const response = await apiUrl.get<Account[]>(
        `/customers/${customerId}/financial/accounts`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getTransactions(
    customerId: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<Transaction[] | ErrorResponse> {
    try {
      const params: any = {};
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;

      const response = await apiUrl.get<Transaction[]>(
        `/customers/${customerId}/financial/transactions`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default financialService;
