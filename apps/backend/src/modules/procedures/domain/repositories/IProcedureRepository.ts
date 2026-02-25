import { Procedure } from '@hdo-teste-tecnico/shared/data-access';

export interface IProcedureRepository {
  findById(id: number): Promise<Procedure | null>;
  create(data: Partial<Procedure>): Promise<Procedure>;
  delete(id: number): Promise<Procedure | null>;
  list(): Promise<Procedure[]>;
  update(id: number, data: Partial<Procedure>): Promise<Procedure>;
}
