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
    const patient = await this.repo.create({
      birthDate: data.birthDate,
      cpf: data.cpf,
      name: data.name,
      phone: data.phone,
    });

    return patient;
  }
}
