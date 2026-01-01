import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';
import { LoginRequest } from '../entities/auth/request/login.request';
import { SignUpRequest } from '../entities/auth/request/signUp.request';
import { LoginResponse } from '../entities/auth/response/login.response';
import { SignUpResponse } from '../entities/auth/response/signup.response';
import { User } from '../entities/user/user';

export interface AuthRepository {
  login(data: LoginRequest): Promise<LoginResponse | ErrorResponse>;
  signUp(data: SignUpRequest): Promise<SignUpResponse | ErrorResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | ErrorResponse>;
}
