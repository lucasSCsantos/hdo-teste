import { Appointment, AppointmentStatus } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { prisma } from '../../../../shared/database/prismaClient';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async findConflict(appointment: Appointment) {
    return prisma.appointment.findFirst({
      where: {
        startTime: { lt: appointment.startTime },
        endTime: { gt: appointment.startTime },
        procedureId: appointment.procedureId,
      },
    });
  }

  async create(data: any) {
    return prisma.appointment.create({
      data: {
        id: data.id,
        patientId: data.patientId,
        procedureId: data.procedureId,
        startTime: data.start,
        endTime: data.end,
      },
    });
  }

  async cancel(id: number, reason: string) {
    return await prisma.appointment.update({
      where: { id },
      data: {
        status: AppointmentStatus['CANCELED'],
        cancellationReason: reason,
      },
    });
  }

  async list(): Promise<Appointment[]> {
    return prisma.appointment.findMany();
  }
}
