import {
  LoginUseCase,
  SignUpUseCase,
  LogoutUseCase,
  GetCurrentUserUseCase,
} from '@core/application/useCases/auth.useCases';
import { AuthRepositoryImp } from '../repositories/auth.repositoryImp';
import { LoginRequest } from '@core/domain/entities/auth/request/login.request';
import { SignUpRequest } from '@core/domain/entities/auth/request/signUp.request';
import { SignUpResponse } from '@core/domain/entities/auth/response/signup.response';
import { User } from '@core/domain/entities/user/user';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';
import { LoginResponse } from '@core/domain/entities/auth/response/login.response';

const authRepository = new AuthRepositoryImp();

export class AuthController {
  async login(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    const response = await LoginUseCase(authRepository, data);
    return response;
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse | ErrorResponse> {
    const response = await SignUpUseCase(authRepository, data);
    return response;
  }

  async logout(): Promise<void> {
    await LogoutUseCase(authRepository);
  }

  async getCurrentUser(): Promise<User | ErrorResponse> {
    const response = await GetCurrentUserUseCase(authRepository);
    return response;
  }
}
