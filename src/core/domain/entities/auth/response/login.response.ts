import { ApiResponse } from '@core/shared/interfaces/api-response.interface';

export interface LoginResponseData {
  accessToken: string;
}

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
