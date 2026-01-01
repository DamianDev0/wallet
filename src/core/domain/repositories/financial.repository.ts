import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';
import { WidgetToken } from '../entities/financial/widget-token';
import { BankLinkRequest, BankLinkResponse } from '../entities/financial/bank-link';
import { LinkStatus } from '../entities/financial/link-status';
import { Account } from '../entities/financial/account';
import { Transaction } from '../entities/financial/transaction';

export interface FinancialRepository {
  getWidgetToken(customerId: string): Promise<WidgetToken | ErrorResponse>;
  linkBankAccount(customerId: string, data: BankLinkRequest): Promise<BankLinkResponse | ErrorResponse>;
  unlinkBankAccount(customerId: string): Promise<void | ErrorResponse>;
  getLinkStatus(customerId: string): Promise<LinkStatus | ErrorResponse>;
  getAccounts(customerId: string): Promise<Account[] | ErrorResponse>;
  getTransactions(customerId: string, dateFrom?: string, dateTo?: string): Promise<Transaction[] | ErrorResponse>;
}
