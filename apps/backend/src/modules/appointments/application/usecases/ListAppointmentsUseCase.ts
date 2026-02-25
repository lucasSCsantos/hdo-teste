import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';

export class ListAppointmentsUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute() {
    const appointments = await this.repo.list();

    return appointments;
  }
}
