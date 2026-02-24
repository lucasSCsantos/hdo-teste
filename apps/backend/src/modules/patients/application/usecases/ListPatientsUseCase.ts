import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
// import { AppError } from '../../../shared/errors/AppError';

export class ListPatientsUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute() {
    const patients = await this.repo.list();

    return patients;
  }
}
