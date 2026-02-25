import { prisma } from '../../../../shared/database/prismaClient';
import { IProcedureRepository } from '../../domain/repositories/IProcedureRepository';

export class PrismaProcedureRepository implements IProcedureRepository {
  async findById(id: number) {
    return prisma.procedure.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return prisma.procedure.create({
      data: {
        id: data.id,
        description: data.description,
        durationMin: data.durationMin,
      },
    });
  }

  async delete(id: number) {
    return await prisma.procedure.delete({
      where: { id },
    });
  }

  async list() {
    return prisma.procedure.findMany();
  }

  async update(id: number, data: any) {
    return prisma.procedure.update({
      where: { id },
      data: {
        description: data.description,
        durationMin: data.durationMinute,
      },
    });
  }
}
