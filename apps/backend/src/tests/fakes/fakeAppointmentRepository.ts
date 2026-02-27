import { Appointment } from '@hdo-teste-tecnico/shared/data-access';

export default class FakeAppointmentRepository {
  appointments: Appointment[] = [];

  async findConflict(newAppointment: Appointment) {
    return this.appointments.find(a => newAppointment.startTime < a.endTime && newAppointment.startTime > a.startTime && newAppointment.procedureId === a.procedureId) || null;
  }

  async create(data: any) {
    this.appointments.push({
      ...data,
      id: this.appointments.length + 1,
    });
    return { ...data, id: this.appointments.length };
  }

  async cancel(id: number, cancellationReason: string) {
    const appointment = this.appointments.find(a => a.id === id);

    if (appointment) {
      appointment.cancellationReason = cancellationReason;
      return appointment;
    }
  }

  async list() {
    return this.appointments;
  }
}
