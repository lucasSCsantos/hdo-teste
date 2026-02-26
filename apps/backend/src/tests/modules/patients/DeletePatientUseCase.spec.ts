import { AppError } from '../../../shared/errors/AppError';
import { DeletePatientUseCase } from '../../../modules/patients/application/usecases/DeletePatientUseCase';
import FakePatientRepository from '../../fakes/fakePatientRepository';
import { Patient } from '@hdo-teste-tecnico/shared/data-access';

describe('DeletePatientUseCase', () => {
  it('should delete a patient', async () => {
    const repo = new FakePatientRepository();
    const useCase = new DeletePatientUseCase(repo as any);

    const patient: Partial<Patient> = { id: 1, name: 'John Doe', phone: '1234567890', document: '123.456.789-00' };
    const result = await repo.create(patient);

    await useCase.execute(result);

    const deletedPatient = await repo.findById(result.id);
    expect(deletedPatient).toBeNull();
  });

  it('should throw an error if patient does not exist', async () => {
    const repo = new FakePatientRepository();
    const useCase = new DeletePatientUseCase(repo as any);

    await expect(useCase.execute({ id: 99 })).rejects.toBeInstanceOf(AppError);
    await expect(useCase.execute({ id: 99 })).rejects.toEqual(new AppError('Patient not found', 404));
  });

  it('should not delete other patients', async () => {
    const repo = new FakePatientRepository();
    const useCase = new DeletePatientUseCase(repo as any);

    const patient1: Partial<Patient> = { name: 'John Doe', phone: '1234567890', document: '123.456.789-00' };
    const patient2: Partial<Patient> = { name: 'John Doe', phone: '1234567892', document: '123.456.789-02' };

    const result1 = await repo.create(patient1);
    const result2 = await repo.create(patient2);

    await useCase.execute(result1);

    const remainingPatient = await repo.findById(2);
    expect(remainingPatient?.id).toEqual(result2.id);
  });
});
