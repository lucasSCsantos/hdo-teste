import { LoginUseCase } from '../../../modules/appointments/application/usecases/LoginUseCase';
import FakeAuthRepository from '../../fakes/fakeAuthRepository';
import { User } from '@hdo-teste-tecnico/shared/data-access';

describe('LoginUseCase', () => {
  it('should login successfully with valid credentials', async () => {
    const repo = new FakeAuthRepository();
    const useCase = new LoginUseCase(repo as any);

    const credentials: Partial<User> = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await useCase.execute(credentials);

    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
  });

  it('should throw error with invalid credentials', async () => {
    const repo = new FakeAuthRepository();
    const useCase = new LoginUseCase(repo as any);

    const credentials: Partial<User> = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    await expect(useCase.execute(credentials)).rejects.toThrow();
  });
});
