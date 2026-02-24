import { ListProceduresUseCase } from '../../../modules/procedures/application/usecases/ListProceduresUseCase';
import FakeProcedureRepository from '../../fakes/fakeProcedureRepository';
import { Procedure } from '@hdo-teste-tecnico/shared/data-access';

describe('ListProceduresUseCase', () => {
  it('should list all procedures', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new ListProceduresUseCase(repo as any);

    const procedure1: Partial<Procedure> = { description: 'Procedure Description', durationMin: 60 };
    const procedure2: Partial<Procedure> = { description: 'Procedure Description 2', durationMin: 90 };

    await repo.create(procedure1);
    await repo.create(procedure2);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });
});
