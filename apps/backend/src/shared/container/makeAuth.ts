import { MongoAuditLogRepository } from '../../modules/audit/infra/repositories/MongooseAuditLogRepository';
import { GetUserUseCase } from '../../modules/auth/application/usecases/GetUserUseCase';
import { LoginUseCase } from '../../modules/auth/application/usecases/LoginUseCase';
import { BCryptHashService } from '../../modules/auth/infra/cryptography/BCryptHashService';
import { PrismaAuthRepository } from '../../modules/auth/infra/repositories/PrismaAuthRepository';
import { JwtTokenService } from '../../modules/auth/infra/tokens/JwtTokenService';
import { GetUserController } from '../../modules/auth/presentation/controllers/GetUserController';
import { LoginController } from '../../modules/auth/presentation/controllers/LoginController';

export function makeLoginController() {
  const repo = new PrismaAuthRepository();
  const hashService = new BCryptHashService();
  const tokenService = new JwtTokenService();
  const auditRepo = new MongoAuditLogRepository();

  const useCase = new LoginUseCase(repo, hashService, tokenService, auditRepo);
  return new LoginController(useCase);
}

export function makeGetUserController() {
  const repo = new PrismaAuthRepository();
  const useCase = new GetUserUseCase(repo);
  return new GetUserController(useCase);
}
