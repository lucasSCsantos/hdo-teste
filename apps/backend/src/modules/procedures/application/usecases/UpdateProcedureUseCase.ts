import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
import { AppError } from '../../../../shared/errors/AppError';

type InputDTO = Partial<Procedure>;

export class UpdateProcedureUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute(id: number, data: InputDTO) {
    const procedureExists = await this.repo.findById(id);

    if (!procedureExists) {
      throw new AppError('Procedure not found', 404);
    }

    if (data.description && !data.description.trim()) {
      throw new AppError('Description cannot be empty');
    }

    try {
      const updatedProcedure = await this.repo.update(id, {
        ...data,
      });

      return updatedProcedure;
    } catch (err) {
      throw new AppError('Could not update procedure. Database error.', 500);
    }
  }
}
