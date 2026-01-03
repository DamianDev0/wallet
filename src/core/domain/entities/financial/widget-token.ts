import { ApiResponse } from '@core/shared/interfaces/api-response.interface';

export interface WidgetToken {
  access: string;
  refresh: string;
  customer_id: string;
  external_id: string;
}

export type WidgetTokenResponse = ApiResponse<WidgetToken>;
