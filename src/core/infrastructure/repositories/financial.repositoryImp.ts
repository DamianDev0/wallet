import { FinancialRepository } from '@core/domain/repositories/financial.repository';
import { WidgetToken } from '@core/domain/entities/financial/widget-token';
import { BankLinkRequest, BankLinkResponse } from '@core/domain/entities/financial/bank-link';
import { LinkStatus } from '@core/domain/entities/financial/link-status';
import { Account } from '@core/domain/entities/financial/account';
import { Transaction } from '@core/domain/entities/financial/transaction';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';
import financialService from '../services/financial.service';

export class FinancialRepositoryImp implements FinancialRepository {
  async getWidgetToken(customerId: string): Promise<WidgetToken | ErrorResponse> {
    return await financialService.getWidgetToken(customerId);
  }

  async linkBankAccount(
    customerId: string,
    data: BankLinkRequest
  ): Promise<BankLinkResponse | ErrorResponse> {
    return await financialService.linkBankAccount(customerId, data);
  }

  async unlinkBankAccount(customerId: string): Promise<void | ErrorResponse> {
    return await financialService.unlinkBankAccount(customerId);
  }

  async getLinkStatus(customerId: string): Promise<LinkStatus | ErrorResponse> {
    return await financialService.getLinkStatus(customerId);
  }

  async getAccounts(customerId: string): Promise<Account[] | ErrorResponse> {
    return await financialService.getAccounts(customerId);
  }

  async getTransactions(
    customerId: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<Transaction[] | ErrorResponse> {
    return await financialService.getTransactions(customerId, dateFrom, dateTo);
  }
}
