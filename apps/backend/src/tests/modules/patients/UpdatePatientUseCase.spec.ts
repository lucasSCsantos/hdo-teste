import { UpdatePatientUseCase } from '../../../modules/patients/application/usecases/UpdatePatientUseCase';
import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import FakePatientRepository from '../../fakes/fakePatientRepository';
import { AppError } from '../../../shared/errors/AppError';

describe('UpdatePatientUseCase', () => {
  it('should update patient if exists', async () => {
    const repo = new FakePatientRepository();
    const useCase = new UpdatePatientUseCase(repo as any);

    const patient: Partial<Patient> = { id: 1, name: 'John Doe', phone: '1234567890', document: '123.456.789-00' };
    await repo.create(patient);

    const updatedData: Partial<Patient> = { name: 'John Doe Updated', phone: '0987654321' };
    const result = await useCase.execute({ id: 1, ...updatedData });

    expect(result.name).toBe(updatedData.name);
    expect(result.phone).toBe(updatedData.phone);
  });

  it('should throw an error if patient does not exist', async () => {
    const repo = new FakePatientRepository();
    const useCase = new UpdatePatientUseCase(repo as any);

    const updatedData: Partial<Patient> = { name: 'John Doe Updated', phone: '0987654321' };

    await expect(useCase.execute({ id: 99, ...updatedData })).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute({ id: 99, ...updatedData })).rejects.toEqual(new AppError('Patient not found', 404));
  });
});
