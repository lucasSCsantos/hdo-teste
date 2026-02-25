import { AppError } from '../../../shared/errors/AppError';
import { LoginUseCase } from '../../../modules/auth/application/usecases/LoginUseCase';
import FakeAuthRepository from '../../fakes/fakeAuthRepository';
import FakeHashService from '../../fakes/fakeHashService';
import FakeTokenService from '../../fakes/fakeTokenService';
import { User } from '@hdo-teste-tecnico/shared/data-access';
import FakeAuditLogRepository from '../../fakes/fakeAuditLogRepository';

describe('LoginUseCase', () => {
  it('should login successfully with valid credentials', async () => {
    const repo = new FakeAuthRepository();
    const hash = new FakeHashService();
    const token = new FakeTokenService();
    const auditRepo = new FakeAuditLogRepository();

    const useCase = new LoginUseCase(repo as any, hash as any, token as any, auditRepo as any);

    const credentials: Partial<User> = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await useCase.execute(credentials as User);

    expect(result.token).toBeDefined();
  });

  it('should login successfully and create audit', async () => {
    const repo = new FakeAuthRepository();
    const hash = new FakeHashService();
    const token = new FakeTokenService();
    const auditRepo = new FakeAuditLogRepository();

    const useCase = new LoginUseCase(repo as any, hash as any, token as any, auditRepo as any);

    const credentials: Partial<User> = {
      email: 'test@example.com',
      password: 'password123',
    };

    await useCase.execute(credentials as User);

    expect(auditRepo.logs[0].action).toBe('LOGIN');
  });

  it('should throw error with invalid credentials', async () => {
    const repo = new FakeAuthRepository();
    const hash = new FakeHashService();
    const token = new FakeTokenService();
    const auditRepo = new FakeAuditLogRepository();

    const useCase = new LoginUseCase(repo as any, hash as any, token as any, auditRepo as any);

    const credentials: Partial<User> = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    await expect(useCase.execute(credentials as User)).rejects.toBeInstanceOf(AppError);
  });
});
