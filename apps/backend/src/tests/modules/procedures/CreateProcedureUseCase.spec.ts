import { CreateProcedureUseCase } from '../../../modules/procedures/application/usecases/CreateProcedureUseCase';
import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import FakeProcedureRepository from '../../fakes/fakeProcedureRepository';

describe('CreateProcedureUseCase', () => {
  it('should create procedure if no conflict', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new CreateProcedureUseCase(repo as any);

    const newProcedure: Partial<Procedure> = {
      description: 'Procedure description',
      durationMin: 60,
    };

    const result = await useCase.execute(newProcedure as any);

    expect(result).toBeDefined();
  });

  it('should not create without data', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new CreateProcedureUseCase(repo as any);

    const newProcedure: Partial<Procedure> = {
      durationMin: 90,
    };

    await expect(useCase.execute(newProcedure as any)).rejects.toThrow();
  });
});
