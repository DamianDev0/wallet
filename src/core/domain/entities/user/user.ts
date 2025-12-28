import { Roles } from '@core/shared/enums/roles.enum';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Roles;
  createdAt: string;
  updatedAt?: string;
}
