import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Procedure> {
  id: number;
}

export class DeleteProcedureUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute(data: InputDTO) {
    const procedure = await this.repo.delete(data.id);

    return procedure;
  }
}
