import { User } from '@hdo-teste-tecnico/shared/data-access';

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

  async login(data: any) {
    const user = this.users.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  // async refresh(data: any) {
  // }
}
