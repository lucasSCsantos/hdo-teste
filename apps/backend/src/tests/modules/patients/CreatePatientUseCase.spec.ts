import { CreatePatientUseCase } from '../../../modules/patients/application/usecases/CreatePatientUseCase';
import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import FakePatientRepository from '../../fakes/fakePatientRepository';

describe('CreatePatientUseCase', () => {
  it('should create patient if no conflict', async () => {
    const repo = new FakePatientRepository();
    const useCase = new CreatePatientUseCase(repo as any);

    const newPatient: Partial<Patient> = {
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      phone: '1234567890',
      cpf: '123.456.789-00',
    };

    const result = await useCase.execute(newPatient as any);

    expect(result).toBeDefined();
  });

  // it('should not create duplicated patient', async () => {
  //   const repo = new FakePatientRepository();
  //   const useCase = new CreatePatientUseCase(repo as any);

  //   const newPatient: Partial<Patient> = {
  //     name: 'John Doe',
  //     birthDate: new Date('1990-01-01'),
  //     phone: '1234567890',
  //     cpf: '123.456.789-00',
  //   };

  //   await expect(useCase.execute(newPatient as any)).rejects.toThrow();
  // });

  it('should not create patient without data', async () => {
    const repo = new FakePatientRepository();
    const useCase = new CreatePatientUseCase(repo as any);

    const newPatient: Partial<Patient> = {
      birthDate: new Date('1990-01-01'),
      phone: '1234567890',
      cpf: '123.456.789-00',
    };

    await expect(useCase.execute(newPatient as any)).rejects.toThrow();
  });
});
