import { User } from '@hdo-teste-tecnico/shared/data-access';
import { AppError } from '../../../../shared/errors/AppError';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { IHashService } from '../../domain/services/IHashService';
import { ITokenService } from '../../domain/services/ITokenService';

interface InputDTO extends Partial<User> {
  email: string;
  password: string;
}

interface OutputDTO {
  token: string;
}
export class LoginUseCase {
  constructor(
    private repo: IAuthRepository,
    private hashService: IHashService,
    private tokenService: ITokenService,
  ) {}

  async execute(data: InputDTO): Promise<OutputDTO> {
    const user = await this.repo.findByEmail(data.email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordMatch = await this.hashService.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.tokenService.generate({
      sub: user.id.toString(),
    });

    return { token };
  }
}
