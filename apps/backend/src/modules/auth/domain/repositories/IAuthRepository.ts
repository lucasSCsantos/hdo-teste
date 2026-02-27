import { User } from '@hdo-teste-tecnico/shared/data-access';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  updateRefreshToken(id: number, refreshToken: string | null): Promise<void>;
}
