import { User } from '@hdo-teste-tecnico/shared/data-access';
import { AppError } from '../../../../shared/errors/AppError';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { ITokenService } from '../../domain/services/ITokenService';

interface OutputDTO {
  token: string;
  refreshToken: string;
}
export class RefreshUseCase {
  constructor(
    private repo: IAuthRepository,
    private tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string): Promise<OutputDTO> {
    const payload = this.tokenService.verify(refreshToken);

    if (payload.type !== 'refresh') {
      throw new AppError('Invalid token type', 401);
    }

    const user = await this.repo.findById(+payload.sub);

    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError('Invalid token', 401);
    }

    const newToken = this.tokenService.generate(
      {
        sub: user.id.toString(),
        type: 'access',
      },
      '15min',
    );

    const newRefreshToken = this.tokenService.generate(
      {
        sub: user.id.toString(),
        type: 'refresh',
      },
      '30d',
    );

    await this.repo.updateRefreshToken(user.id, newRefreshToken);

    return { token: newToken, refreshToken: newRefreshToken };
  }
}
