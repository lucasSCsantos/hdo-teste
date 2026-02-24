import { CreateProcedureUseCase } from '../../../modules/Procedures/application/usecases/CancelProcedureUseCase';
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

    const result = await useCase.execute(newProcedure);

    expect(result.end).toBeDefined();
  });

  it('should not create without data', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new CreateProcedureUseCase(repo as any);

    const newProcedure: Partial<Procedure> = {
      description: 'Procedure without duration description',
    };

    await expect(useCase.execute(newProcedure)).rejects.toThrow();
  });
});
