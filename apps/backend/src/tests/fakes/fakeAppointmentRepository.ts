import { Appointment } from '@hdo-teste-tecnico/prisma/browser';

export default class FakeAppointmentRepository {
  appointments: Appointment[] = [];

  async findConflict(start: Date, end: Date) {
    return this.appointments.find(a => start < a.endTime && end > a.createdAt) || null;
  }

  async create(data: any) {
    this.appointments.push(data);
    return data;
  }

  async cancel(id: number) {
    this.appointments = this.appointments.filter(a => a.id !== id);
  }
}
