import { ListPatientsUseCase } from '../../../modules/patients/application/usecases/ListPatientsUseCase';
import FakePatientRepository from '../../fakes/fakePatientRepository';
import { Patient } from '@hdo-teste-tecnico/shared/data-access';

describe('ListPatientsUseCase', () => {
  it('should list all patients', async () => {
    const repo = new FakePatientRepository();
    const useCase = new ListPatientsUseCase(repo as any);

    const patient1: Partial<Patient> = { id: 1, name: 'John Doe', birthDate: new Date('1990-01-01'), phone: '1234567890', cpf: '123.456.789-00' };
    const patient2: Partial<Patient> = { id: 2, name: 'John Doe', birthDate: new Date('1990-01-03'), phone: '1234567892', cpf: '123.456.789-02' };

    await repo.create(patient1);
    await repo.create(patient2);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });
});
