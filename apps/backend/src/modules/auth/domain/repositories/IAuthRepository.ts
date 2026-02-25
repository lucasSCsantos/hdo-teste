import { User } from '@hdo-teste-tecnico/shared/data-access';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
}
