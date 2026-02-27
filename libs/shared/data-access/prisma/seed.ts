import bcrypt from 'bcrypt';
import { PrismaClient } from '../src';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.POSTGRES_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const procedures = [
    { description: 'Consulta', durationMin: 30 },
    { description: 'Endoscopia', durationMin: 60 },
    { description: 'Pequena cirurgia', durationMin: 90 },
  ];

  for (const p of procedures) {
    const exists = await prisma.procedure.findFirst({
      where: {
        description: p.description,
        durationMin: p.durationMin,
      },
      select: { id: true },
    });

    if (!exists) {
      await prisma.procedure.create({ data: p });
    }
  }

  const email = 'admin@hospital.local';
  const plainPassword = 'Senha@123';

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'ADMIN',
      password: passwordHash,
    },
    create: {
      email,
      name: 'ADMIN',
      password: passwordHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
