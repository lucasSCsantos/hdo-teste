import { User } from './user.interfaces';

export interface AuthLoginResponse {
  token: string;
  user: Partial<User> | null;
}
