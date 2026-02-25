import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Procedure> {
  id: number;
}

export class DeleteProcedureUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute(data: InputDTO) {
    const exists = await this.repo.findById(data.id);

    if (!exists) {
      throw new Error(`Procedure not found`);
      // throw new AppError(`Procedure with ID ${data.id} not found`, 404);
    }

    try {
      await this.repo.delete(data.id);
    } catch (err) {
      throw new Error('Could not delete procedure. Database error.');
      // throw new AppError('Could not delete procedure. Database error.', 500);
    }
  }
}
