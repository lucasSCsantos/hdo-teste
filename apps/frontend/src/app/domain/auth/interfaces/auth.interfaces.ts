import { User } from './user.interfaces';

export interface AuthLoginResponse {
  token: string;
  refreshToken: string;
  user: Partial<User> | null;
}
