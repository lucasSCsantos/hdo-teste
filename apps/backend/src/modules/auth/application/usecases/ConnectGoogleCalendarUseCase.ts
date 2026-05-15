import { IGoogleOAuthService } from '../../domain/services/IGoogleOAuthService';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { IAuditLogRepository } from '../../../audit/domain/repositories/IAuditLogRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface InputDTO {
  userId: number;
  code: string;
  timezone?: string;
}

interface OutputDTO {
  success: boolean;
  message: string;
}

export class ConnectGoogleCalendarUseCase {
  constructor(
    private googleOAuthService: IGoogleOAuthService,
    private authRepository: IAuthRepository,
    private auditRepository: IAuditLogRepository
  ) {}

  async execute(data: InputDTO): Promise<OutputDTO> {
    try {
      const { userId, code, timezone } = data;

      // Exchange authorization code for tokens
      const { refreshToken } = await this.googleOAuthService.exchangeCodeForTokens(code);

      // Store refresh token and timezone in database
      await this.authRepository.updateGoogleRefreshToken(userId, refreshToken);

      if (timezone) {
        await this.authRepository.updateUserTimezone(userId, timezone);
      }

      // Audit log the connection
      await this.auditRepository.create({
        action: 'CONNECT_GOOGLE_CALENDAR',
        actorId: userId,
        entityId: userId,
        entityType: 'USER',
        metadata: { timezone: timezone || 'not provided' },
      });

      return {
        success: true,
        message: 'Google Calendar connected successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(`Failed to connect Google Calendar: ${error.message}`, 400);
      }
      throw new AppError('Failed to connect Google Calendar', 500);
    }
  }
}
