import { LoginRequest } from '@core/domain/entities/auth/request/login.request';
import { SignUpRequest } from '@core/domain/entities/auth/request/signUp.request';
import { LoginResponse } from '@core/domain/entities/auth/response/login.response';
import { SignUpResponse } from '@core/domain/entities/auth/response/signup.response';
import { User } from '@core/domain/entities/user/user';
import { AuthRepository } from '@core/domain/repositories/auth.repository';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';
import authService from '../services/auth.service';

export class AuthRepositoryImp implements AuthRepository {
  async login(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    return await authService.login(data);
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse | ErrorResponse> {
    return await authService.signUp(data);
  }

  async logout(): Promise<void> {
    return await authService.logout();
  }

  async getCurrentUser(): Promise<User | ErrorResponse> {
    return await authService.getCurrentUser();
  }
}
