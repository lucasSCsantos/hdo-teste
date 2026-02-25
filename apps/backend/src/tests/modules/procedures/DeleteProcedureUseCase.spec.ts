import { DeleteProcedureUseCase } from '../../../modules/procedures/application/usecases/DeleteProcedureUseCase';
import FakeProcedureRepository from '../../fakes/fakeProcedureRepository';
import { Procedure } from '@hdo-teste-tecnico/shared/data-access';

describe('DeleteProcedureUseCase', () => {
  it('should delete a procedure', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new DeleteProcedureUseCase(repo as any);

    const procedure: Partial<Procedure> = { description: 'Procedure Description', durationMin: 60 };
    const result = await repo.create(procedure);

    await useCase.execute(result);

    const deletedProcedure = await repo.findById(result.id!);
    expect(deletedProcedure).toBeNull();
  });

  it('should throw an error if procedure does not exist', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new DeleteProcedureUseCase(repo as any);

    await expect(useCase.execute({ id: 99 })).rejects.toThrow('Procedure not found');
  });

  it('should not delete other procedures', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new DeleteProcedureUseCase(repo as any);

    const procedure1: Partial<Procedure> = { description: 'Procedure Description', durationMin: 60 };
    const procedure2: Partial<Procedure> = { description: 'Procedure Description 2', durationMin: 90 };

    const result1 = await repo.create(procedure1);
    const result2 = await repo.create(procedure2);

    await useCase.execute(result1);

    const remainingProcedure = await repo.findById(3); // 3 pois já existe um item criado no repositório fake
    expect(remainingProcedure?.id).toEqual(result2.id);
  });
});
