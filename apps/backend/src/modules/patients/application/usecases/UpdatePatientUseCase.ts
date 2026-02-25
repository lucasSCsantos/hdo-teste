import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import { AppError } from '../../../../shared/errors/AppError';

type InputDTO = Partial<Patient>;

export class UpdatePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(id: number, data: InputDTO) {
    const patientExists = await this.repo.findById(id);

    if (!patientExists) {
      throw new AppError('Patient not found', 404);
    }

    if (data.name && !data.name.trim()) {
      throw new AppError('Name cannot be empty');
    }

    try {
      const updatedPatient = await this.repo.update(id, {
        ...data,
      });

      return updatedPatient;
    } catch (err) {
      throw new AppError('Could not update patient. Database error.', 500);
    }
  }
}
