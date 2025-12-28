import { ApiResponse } from '@core/shared/interfaces/api-response.interface';
import { User } from '../../user/user';

export interface LoginResponseData {
  accessToken: string;
  user: User;
}

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
