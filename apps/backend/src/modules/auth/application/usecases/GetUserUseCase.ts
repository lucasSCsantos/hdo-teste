import { User } from '@hdo-teste-tecnico/shared/data-access';
import { AppError } from '../../../../shared/errors/AppError';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

type OutputDTO = User;

export class GetUserUseCase {
  constructor(private repo: IAuthRepository) {}

  async execute(id: number): Promise<OutputDTO> {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
