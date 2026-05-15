import { MongoAuditLogRepository } from '../../modules/audit/infra/repositories/MongooseAuditLogRepository';
import { GetUserUseCase } from '../../modules/auth/application/usecases/GetUserUseCase';
import { LoginUseCase } from '../../modules/auth/application/usecases/LoginUseCase';
import { RefreshUseCase } from '../../modules/auth/application/usecases/RefreshUseCase';
import { ConnectGoogleCalendarUseCase } from '../../modules/auth/application/usecases/ConnectGoogleCalendarUseCase';
import { BCryptHashService } from '../../modules/auth/infra/cryptography/BCryptHashService';
import { PrismaAuthRepository } from '../../modules/auth/infra/repositories/PrismaAuthRepository';
import { JwtTokenService } from '../../modules/auth/infra/tokens/JwtTokenService';
import { GoogleOAuthService } from '../../modules/auth/infra/services/GoogleOAuthService';
import { GetUserController } from '../../modules/auth/presentation/controllers/GetUserController';
import { LoginController } from '../../modules/auth/presentation/controllers/LoginController';
import { RefreshController } from '../../modules/auth/presentation/controllers/RefreshController';
import { ConnectGoogleCalendarController } from '../../modules/auth/presentation/controllers/ConnectGoogleCalendarController';
import { GoogleAuthUrlController } from '../http/controllers/GoogleAuthUrlController';

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

export function makeRefreshController() {
  const repo = new PrismaAuthRepository();
  const tokenService = new JwtTokenService();

  const useCase = new RefreshUseCase(repo, tokenService);
  return new RefreshController(useCase);
}

export function makeGoogleAuthUrlController() {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || '';

  const googleOAuthService = new GoogleOAuthService(clientId, clientSecret, redirectUri);
  return new GoogleAuthUrlController(googleOAuthService);
}

export function makeConnectGoogleCalendarController() {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || '';

  const googleOAuthService = new GoogleOAuthService(clientId, clientSecret, redirectUri);
  const authRepository = new PrismaAuthRepository();
  const auditRepository = new MongoAuditLogRepository();

  const useCase = new ConnectGoogleCalendarUseCase(
    googleOAuthService,
    authRepository,
    auditRepository
  );

  return new ConnectGoogleCalendarController(useCase);
}
