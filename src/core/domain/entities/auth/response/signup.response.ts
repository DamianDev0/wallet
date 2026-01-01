import { User } from '@core/domain/entities/user/user';
import { ApiResponse } from '@core/shared/interfaces/api-response.interface';


export type SignUpResponse = ApiResponse<User>;