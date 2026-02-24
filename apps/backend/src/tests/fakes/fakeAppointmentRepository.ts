import { Appointment } from '@hdo-teste-tecnico/shared/data-access';

export default class FakeAppointmentRepository {
  appointments: Appointment[] = [];

  async findConflict(newAppointment: Appointment) {
    return this.appointments.find(a => newAppointment.startTime < a.endTime && newAppointment.startTime > a.startTime) || null;
  }

  async create(data: any) {
    this.appointments.push(data);
    return data;
  }

  async cancel(id: number) {
    this.appointments = this.appointments.filter(a => a.id !== id);
  }

  async list() {
    return this.appointments;
  }
}
