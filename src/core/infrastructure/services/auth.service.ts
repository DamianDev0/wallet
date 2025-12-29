import apiUrl from '@core/config/api-url';
import { LoginRequest } from '@core/domain/entities/auth/request/login.request';
import { SignUpRequest } from '@core/domain/entities/auth/request/signUp.request';
import { LoginResponse } from '@core/domain/entities/auth/response/login.response';
import { User } from '@core/domain/entities/user/user';
import { handleApiError } from '@core/shared/helpers/errorHandler';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';

const authService = {
  async login(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    try {
      const response = await apiUrl.post<LoginResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async signUp(data: SignUpRequest): Promise<User | ErrorResponse> {
    try {
      const response = await apiUrl.post<{ data: User }>('/auth/signup', data);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async logout(): Promise<void> {
    try {
      await apiUrl.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser(): Promise<User | ErrorResponse> {
    try {
      const response = await apiUrl.get<{ data: User }>('/auth/me');
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default authService;
