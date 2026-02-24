import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Procedure> {
  id: number;
}

export class UpdateProcedureUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute(data: InputDTO) {
    // const appointment = await this.repo.(data.id);
    // return appointment;
  }
}
