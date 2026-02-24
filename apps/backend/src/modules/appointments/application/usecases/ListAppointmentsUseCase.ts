import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
// import { AppError } from '../../../shared/errors/AppError';

export class ListAppointmentsUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute() {
    const appointments = await this.repo.list();

    return appointments;
  }
}
