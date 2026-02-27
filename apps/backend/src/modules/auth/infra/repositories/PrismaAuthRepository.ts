import { User } from '@hdo-teste-tecnico/shared/data-access';
import { prisma } from '../../../../shared/database/prismaClient';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

export class PrismaAuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return user;
  }

  async updateRefreshToken(id: number, refreshToken: string | null): Promise<void> {
    await prisma.user.update({
      where: { id: +id },
      data: { refreshToken },
    });
  }
}
