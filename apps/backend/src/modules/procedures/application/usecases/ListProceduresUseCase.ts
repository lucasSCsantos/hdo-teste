import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';

export class ListProceduresUseCase {
  constructor(private repo: IProcedureRepository) {}

  async execute() {
    const procedure = await this.repo.list();

    return procedure;
  }
}
