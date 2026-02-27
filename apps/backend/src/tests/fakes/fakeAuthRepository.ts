import { User } from '@hdo-teste-tecnico/shared/data-access';
import { AppError } from '../../shared/errors/AppError';
import { IAuthRepository } from '../../modules/auth/domain/repositories/IAuthRepository';

export default class FakeAuthRepository implements IAuthRepository {
  users: User[] = [
    {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
      refreshToken: null,
    },
  ];

  async findByEmail(email: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async updateRefreshToken(id: number, refreshToken: string | null): Promise<void> {
    const userIndex = this.users.findIndex(p => p.id === id);

    if (userIndex === -1) {
      throw new AppError('user not found', 404);
    }

    this.users[userIndex] = { ...this.users[userIndex], refreshToken };
  }
}
