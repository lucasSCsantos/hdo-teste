import { prisma } from '../../../../shared/database/prismaClient';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';

export class PrismaPatientRepository implements IPatientRepository {
  async findById(id: number) {
    return prisma.patient.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return prisma.patient.create({
      data: {
        name: data.name,
        birthDate: data.birthDate,
        phone: data.phone,
        cpf: data.cpf,
      },
    });
  }

  async delete(id: number) {
    return await prisma.patient.delete({
      where: { id },
    });
  }

  async list() {
    return prisma.patient.findMany();
  }
}
