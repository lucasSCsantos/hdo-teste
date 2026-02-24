import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';
// import { AppError } from '../../../shared/errors/AppError';

export class ListProceduresUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute() {
    const procedure = await this.repo.list();

    return procedure;
  }
}
