import { UpdateProcedureUseCase } from '../../../modules/procedures/application/usecases/UpdateProcedureUseCase';
import { Procedure } from '@hdo-teste-tecnico/shared/data-access';
import FakeProcedureRepository from '../../fakes/fakeProcedureRepository';
import { AppError } from '../../../shared/errors/AppError';

describe('UpdateProcedureUseCase', () => {
  it('should update procedure if exists', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new UpdateProcedureUseCase(repo as any);

    const procedure: Partial<Procedure> = {
      description: 'Procedure description',
      durationMin: 60,
    };
    await repo.create(procedure);

    const updatedData: Partial<Procedure> = { durationMin: 90 };
    const result = await useCase.execute(1, updatedData);

    expect(result.durationMin).toBe(updatedData.durationMin);
  });

  it('should throw an error if procedure does not exist', async () => {
    const repo = new FakeProcedureRepository();
    const useCase = new UpdateProcedureUseCase(repo as any);

    const updatedData: Partial<Procedure> = { durationMin: 30 };

    await expect(useCase.execute(99, updatedData)).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute(99, updatedData)).rejects.toEqual(new AppError('Procedure not found', 404));
  });
});
