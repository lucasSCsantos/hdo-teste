import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Procedure> {
  description: string;
  durationMin: number;
}

export class CreateProcedureUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute(data: InputDTO) {
    if (!data.description.trim()) {
      throw new Error('Description cannot be empty');
      // throw new AppError('Description cannot be empty', 400);
    }

    try {
      const procedure = await this.repo.create({
        description: data.description,
        durationMin: data.durationMin,
      });

      return procedure;
    } catch (err) {
      throw new Error('Could not delete procedure. Database error.');
      // throw new AppError('Could not delete procedure. Database error.', 500);
    }
  }
}
