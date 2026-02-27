import { AppointmentStatus } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';

export class ListAppointmentsUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(query?: { status?: AppointmentStatus; patientId?: string; startDate: Date; endDate: Date }) {
    let appointments;

    if (query?.status || query?.patientId || (query?.startDate && query?.endDate)) {
      appointments = await this.repo.listQuery(query);
    } else {
      appointments = await this.repo.list();
    }

    return appointments.map(appointment => ({
      id: appointment.id,
      patientId: appointment.patientId,
      patientName: appointment.patient.name,
      procedureId: appointment.procedureId,
      procedureDescription: appointment.procedure.description,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
    }));
  }
}
