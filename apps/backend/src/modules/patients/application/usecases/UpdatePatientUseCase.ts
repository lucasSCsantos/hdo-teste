import { Patient } from '@hdo-teste-tecnico/shared/data-access';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface InputDTO extends Partial<Patient> {
  id: number;
}

export class UpdatePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(data: InputDTO) {
    const { id, ...newData } = data;

    const patientExists = await this.repo.findById(id);

    if (!patientExists) {
      throw new AppError('Patient not found', 404);
    }

    if (newData.name && !newData.name.trim()) {
      throw new AppError('Name cannot be empty');
    }

    try {
      const updatedPatient = await this.repo.update(id, {
        ...newData,
      });

      return updatedPatient;
    } catch (err) {
      throw new AppError('Could not update patient. Database error.', 500);
    }
  }
}
