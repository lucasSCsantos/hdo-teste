import { DeleteProcedure } from '../../../modules/procedures/application/usecases/DeleteProcedureUseCase';
import FakeProcedureRepository from '../../fakes/fakeProcedureRepository';
import { Procedure } from '@hdo-teste-tecnico/shared/data-access';

describe('DeleteProcedureUseCase', () => {
  it('should delete a procedure', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new DeleteProcedure(repo as any);

    const procedure: Partial<Procedure> = { description: 'Procedure Description', durationMin: 60 };
    await repo.create(procedure);

    await useCase.execute(1);

    const deletedProcedure = await repo.findById(1);
    expect(deletedProcedure).toBeUndefined();
  });

  it('should throw an error if procedure does not exist', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new DeleteProcedure(repo as any);

    await expect(useCase.execute(99)).rejects.toThrow('Procedure not found');
  });

  it('should not delete other procedures', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new DeleteProcedure(repo as any);

    const procedure1: Partial<Procedure> = { description: 'Procedure Description', durationMin: 60 };
    const procedure2: Partial<Procedure> = { description: 'Procedure Description 2', durationMin: 90 };

    await repo.create(procedure1);
    await repo.create(procedure2);

    await useCase.execute(1);

    const remainingProcedure = await repo.findById(2);
    expect(remainingProcedure).toEqual(procedure2);
  });
});
