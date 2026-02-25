import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Patient> {
  id: number;
}

export class DeletePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(data: InputDTO) {
    const exists = await this.repo.findById(data.id);

    if (!exists) {
      throw new Error(`Patient not found`);
      // throw new AppError(`Patient with ID ${data.id} not found`, 404);
    }

    try {
      await this.repo.delete(data.id);
    } catch (err) {
      throw new Error('Could not delete procedure. Database error.');
      // throw new AppError('Could not delete procedure. Database error.', 500);
    }
  }
}
