import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface InputDTO extends Partial<Procedure> {
  id: number;
}

export class UpdateProcedureUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute(data: InputDTO) {
    const { id, ...newData } = data;
    const procedureExists = await this.repo.findById(id);

    if (!procedureExists) {
      throw new AppError('Procedure not found', 404);
    }

    if (newData.description && !newData.description.trim()) {
      throw new AppError('Description cannot be empty');
    }

    try {
      const updatedProcedure = await this.repo.update(id, {
        ...newData,
      });

      return updatedProcedure;
    } catch (err) {
      throw new AppError('Could not update procedure. Database error.', 500);
    }
  }
}
