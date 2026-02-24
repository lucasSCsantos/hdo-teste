import { Appointment } from '@hdo-teste-tecnico/shared/data-access';

export interface IAppointmentRepository {
  findConflict(appointment: Appointment): Promise<Appointment | null>;
  create(data: Partial<Appointment>): Promise<Appointment>;
  cancel(id: number, reason: string): Promise<Appointment | null>;
  list(): Promise<Appointment[]>;
}
