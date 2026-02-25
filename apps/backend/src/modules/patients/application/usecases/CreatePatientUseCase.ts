import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Patient> {
  name: string;
  birthDate: Date;
  phone: string;
  cpf: string;
}

export class CreatePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(data: InputDTO) {
    if (!data.name.trim()) {
      throw new Error('Name cannot be empty');
      // throw new AppError('Name cannot be empty', 400);
    }

    try {
      const patient = await this.repo.create({
        birthDate: data.birthDate,
        cpf: data.cpf,
        name: data.name,
        phone: data.phone,
      });
      return patient;
    } catch (err) {
      throw new Error('Could not delete patient. Database error.');
      // throw new AppError('Could not delete procedure. Database error.', 500);
    }
  }
}
