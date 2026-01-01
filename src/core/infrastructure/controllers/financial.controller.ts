import {
  GetWidgetTokenUseCase,
  LinkBankAccountUseCase,
  UnlinkBankAccountUseCase,
  GetLinkStatusUseCase,
  GetAccountsUseCase,
  GetTransactionsUseCase,
} from '@core/application/useCases/financial.useCases';
import { FinancialRepositoryImp } from '../repositories/financial.repositoryImp';
import { WidgetToken } from '@core/domain/entities/financial/widget-token';
import { BankLinkRequest, BankLinkResponse } from '@core/domain/entities/financial/bank-link';
import { LinkStatus } from '@core/domain/entities/financial/link-status';
import { Account } from '@core/domain/entities/financial/account';
import { Transaction } from '@core/domain/entities/financial/transaction';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';

const financialRepository = new FinancialRepositoryImp();

export class FinancialController {
  async getWidgetToken(customerId: string): Promise<WidgetToken | ErrorResponse> {
    return await GetWidgetTokenUseCase(financialRepository, customerId);
  }

  async linkBankAccount(
    customerId: string,
    data: BankLinkRequest
  ): Promise<BankLinkResponse | ErrorResponse> {
    return await LinkBankAccountUseCase(financialRepository, customerId, data);
  }

  async unlinkBankAccount(customerId: string): Promise<void | ErrorResponse> {
    return await UnlinkBankAccountUseCase(financialRepository, customerId);
  }

  async getLinkStatus(customerId: string): Promise<LinkStatus | ErrorResponse> {
    return await GetLinkStatusUseCase(financialRepository, customerId);
  }

  async getAccounts(customerId: string): Promise<Account[] | ErrorResponse> {
    return await GetAccountsUseCase(financialRepository, customerId);
  }

  async getTransactions(
    customerId: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<Transaction[] | ErrorResponse> {
    return await GetTransactionsUseCase(financialRepository, customerId, dateFrom, dateTo);
  }
}
