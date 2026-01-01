import { LoginRequest } from '@core/domain/entities/auth/request/login.request';
import { SignUpRequest } from '@core/domain/entities/auth/request/signUp.request';
import { LoginResponse } from '@core/domain/entities/auth/response/login.response';
import { SignUpResponse } from '@core/domain/entities/auth/response/signup.response';
import { User } from '@core/domain/entities/user/user';
import { AuthRepository } from '@core/domain/repositories/auth.repository';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';

export const LoginUseCase = (
  authRepository: AuthRepository,
  data: LoginRequest
): Promise<LoginResponse | ErrorResponse> => {
  return authRepository.login(data);
};

export const SignUpUseCase = (
  authRepository: AuthRepository,
  data: SignUpRequest
): Promise<SignUpResponse | ErrorResponse> => {
  return authRepository.signUp(data);
};

export const LogoutUseCase = (authRepository: AuthRepository): Promise<void> => {
  return authRepository.logout();
};

export const GetCurrentUserUseCase = (
  authRepository: AuthRepository
): Promise<User | ErrorResponse> => {
  return authRepository.getCurrentUser();
};
