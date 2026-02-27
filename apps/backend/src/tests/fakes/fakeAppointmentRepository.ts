import { Appointment, AppointmentStatus } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../modules/appointments/domain/repositories/IAppointmentRepository';

export default class FakeAppointmentRepository implements IAppointmentRepository {
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

    return null;
  }

  async list() {
    return this.appointments.map(a => ({
      ...a,
      patient: {
        id: a.patientId,
        name: `Patient ${a.patientId}`,
        createdAt: new Date(),
        document: `Document ${a.patientId}`,
        phone: null,
        updatedAt: new Date(),
      },
      procedure: {
        id: a.procedureId,
        createdAt: new Date(),
        description: `Description for Procedure ${a.procedureId}`,
        durationMin: 30,
      },
    }));
  }

  async listQuery(params: { status?: AppointmentStatus; patientId?: string; startDate?: Date; endDate?: Date }): Promise<any[]> {
    return this.appointments
      .filter(a => {
        if (params.status && a.status !== params.status) return false;
        if (params.patientId && a.patientId !== +params.patientId) return false;
        if (params.startDate && a.startTime < params.startDate) return false;
        if (params.endDate && a.endTime > params.endDate) return false;
        return true;
      })
      .map(a => ({
        ...a,
        patient: {
          id: a.patientId,
          name: `Patient ${a.patientId}`,
          createdAt: new Date(),
          document: `Document ${a.patientId}`,
          phone: null,
          updatedAt: new Date(),
        },
        procedure: {
          id: a.procedureId,
          createdAt: new Date(),
          description: `Description for Procedure ${a.procedureId}`,
          durationMin: 30,
        },
      }));
  }
}
