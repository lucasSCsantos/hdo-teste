import { Appointment, AppointmentStatus, Prisma } from '@hdo-teste-tecnico/shared/data-access';

export interface IAppointmentRepository {
  findConflict(appointment: Appointment): Promise<Appointment | null>;
  create(data: Partial<Appointment>): Promise<Appointment>;
  cancel(id: number, reason: string): Promise<Appointment | null>;
  list(): Promise<
    Prisma.AppointmentGetPayload<{
      include: { patient: true; procedure: true };
    }>[]
  >;
  listQuery(params: { status?: AppointmentStatus; patientId?: string; startDate?: Date; endDate?: Date }): Promise<
    Prisma.AppointmentGetPayload<{
      include: { patient: true; procedure: true };
    }>[]
  >;
}
