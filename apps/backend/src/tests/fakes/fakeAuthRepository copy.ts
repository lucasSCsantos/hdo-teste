import { User } from '@hdo-teste-tecnico/shared/data-access';

export default class FakeAuthRepository {
  users: User[] = [];

  async login(data: any) {
    const user = this.users.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  async refresh(data: any) {
    // For simplicity, this fake doesn't implement token refresh logic
  }
}
