import { DeletePatient } from '../../../modules/patients/application/usecases/DeletePatientUseCase';
import FakePatientRepository from '../../fakes/fakePatientRepository';
import { Patient } from '@hdo-teste-tecnico/shared/data-access';

describe('DeletePatientUseCase', () => {
  it('should delete a patient', async () => {
    const repo = new FakePatientRepository();
    const useCase = new DeletePatient(repo as any);

    const patient: Partial<Patient> = { id: 1, name: 'John Doe', birthDate: new Date('1990-01-01'), phone: '1234567890', cpf: '123.456.789-00' };
    await repo.create(patient);

    await useCase.execute(1);

    const deletedPatient = await repo.findById(1);
    expect(deletedPatient).toBeUndefined();
  });

  it('should throw an error if patient does not exist', async () => {
    const repo = new FakePatientRepository();
    const useCase = new DeletePatient(repo as any);

    await expect(useCase.execute(99)).rejects.toThrow('Patient not found');
  });

  it('should not delete other patients', async () => {
    const repo = new FakePatientRepository();
    const useCase = new DeletePatient(repo as any);

    const patient1: Partial<Patient> = { id: 1, name: 'John Doe', birthDate: new Date('1990-01-01'), phone: '1234567890', cpf: '123.456.789-00' };
    const patient2: Partial<Patient> = { id: 2, name: 'John Doe', birthDate: new Date('1990-01-03'), phone: '1234567892', cpf: '123.456.789-02' };

    await repo.create(patient1);
    await repo.create(patient2);

    await useCase.execute(1);

    const remainingPatient = await repo.findById(2);
    expect(remainingPatient).toEqual(patient2);
  });
});
