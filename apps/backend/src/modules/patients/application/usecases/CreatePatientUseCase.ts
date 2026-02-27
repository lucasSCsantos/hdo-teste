import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface InputDTO extends Partial<Patient> {
  name: string;
  phone: string;
  document: string;
}

export class CreatePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(data: InputDTO) {
    if (!data.name.trim()) {
      throw new AppError('Name cannot be empty');
    }

    try {
      const patient = await this.repo.create({
        document: data.document,
        name: data.name,
        phone: data.phone,
      });
      return patient;
    } catch (err) {
      throw new AppError('Could not create patient. Database error.', 500);
    }
  }
}
