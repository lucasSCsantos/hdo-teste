import { Appointment, AppointmentStatus, Prisma } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { prisma } from '../../../../shared/database/prismaClient';
import { start } from 'repl';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async findConflict(appointment: Appointment) {
    return prisma.appointment.findFirst({
      where: {
        startTime: { lt: appointment.startTime },
        endTime: { gt: appointment.startTime },
        OR: [{ procedureId: appointment.procedureId }, { patientId: appointment.patientId }],
      },
    });
  }

  async create(data: any) {
    return prisma.appointment.create({
      data: {
        id: data.id,
        patientId: data.patientId,
        procedureId: data.procedureId,
        startTime: data.startTime,
        endTime: data.endTime,
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

  async list(): Promise<
    Prisma.AppointmentGetPayload<{
      include: { patient: true; procedure: true };
    }>[]
  > {
    return prisma.appointment.findMany({
      include: {
        patient: true,
        procedure: true,
      },
    });
  }

  async listQuery(params: { status?: AppointmentStatus; patientId?: string; startDate?: Date; endDate?: Date }): Promise<
    Prisma.AppointmentGetPayload<{
      include: { patient: true; procedure: true };
    }>[]
  > {
    const { status, patientId, startDate, endDate } = params;

    const where: Prisma.AppointmentWhereInput = {
      ...(status ? { status } : {}),
      ...(patientId ? { patientId: +patientId } : {}),
      ...(startDate &&
        endDate && {
          startTime: { gte: startDate, lt: endDate },
        }),
    };

    return prisma.appointment.findMany({
      where,
      include: { patient: true, procedure: true },
      orderBy: { startTime: 'asc' },
    });
  }
}
