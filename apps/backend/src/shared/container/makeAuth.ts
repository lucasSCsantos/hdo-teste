import { LoginUseCase } from '../../modules/auth/application/usecases/LoginUseCase';
import { BCryptHashService } from '../../modules/auth/infra/cryptography/BCryptHashService';
import { PrismaAuthRepository } from '../../modules/auth/infra/repositories/PrismaAuthRepository';
import { JwtTokenService } from '../../modules/auth/infra/tokens/JwtTokenService';
import { LoginController } from '../../modules/auth/presentation/controllers/LoginController';

export function makeLoginController() {
  const userRepo = new PrismaAuthRepository();
  const hashService = new BCryptHashService();
  const tokenService = new JwtTokenService();

  const useCase = new LoginUseCase(userRepo, hashService, tokenService);
  return new LoginController(useCase);
}
