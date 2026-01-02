import { FinancialRepository } from '@core/domain/repositories/financial.repository';
import { WidgetToken } from '@core/domain/entities/financial/widget-token';
import { BelvoCredentials } from '@core/domain/entities/financial/belvo-credentials';
import { BankLinkRequest, BankLinkResponse } from '@core/domain/entities/financial/bank-link';
import { LinkStatus } from '@core/domain/entities/financial/link-status';
import { Account } from '@core/domain/entities/financial/account';
import { Transaction } from '@core/domain/entities/financial/transaction';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';

export const GetBelvoCredentialsUseCase = (
  financialRepository: FinancialRepository,
  customerId: string
): Promise<BelvoCredentials | ErrorResponse> => {
  return financialRepository.getBelvoCredentials(customerId);
};

export const GetWidgetTokenUseCase = (
  financialRepository: FinancialRepository,
  customerId: string
): Promise<WidgetToken | ErrorResponse> => {
  return financialRepository.getWidgetToken(customerId);
};

export const LinkBankAccountUseCase = (
  financialRepository: FinancialRepository,
  customerId: string,
  data: BankLinkRequest
): Promise<BankLinkResponse | ErrorResponse> => {
  return financialRepository.linkBankAccount(customerId, data);
};

export const UnlinkBankAccountUseCase = (
  financialRepository: FinancialRepository,
  customerId: string
): Promise<void | ErrorResponse> => {
  return financialRepository.unlinkBankAccount(customerId);
};

export const GetLinkStatusUseCase = (
  financialRepository: FinancialRepository,
  customerId: string
): Promise<LinkStatus | ErrorResponse> => {
  return financialRepository.getLinkStatus(customerId);
};

export const GetAccountsUseCase = (
  financialRepository: FinancialRepository,
  customerId: string
): Promise<Account[] | ErrorResponse> => {
  return financialRepository.getAccounts(customerId);
};

export const GetTransactionsUseCase = (
  financialRepository: FinancialRepository,
  customerId: string,
  dateFrom?: string,
  dateTo?: string
): Promise<Transaction[] | ErrorResponse> => {
  return financialRepository.getTransactions(customerId, dateFrom, dateTo);
};
