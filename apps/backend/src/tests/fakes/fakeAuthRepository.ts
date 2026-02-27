import { User } from '@hdo-teste-tecnico/shared/data-access';
import { AppError } from '../../shared/errors/AppError';

export default class FakeAuthRepository {
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
}
