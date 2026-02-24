import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
// import { AppError } from '../../../shared/errors/AppError';

interface InputDTO extends Partial<Patient> {
  id: number;
}

export class DeletePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(data: InputDTO) {
    const patient = await this.repo.delete(data.id);

    return patient;
  }
}
