import { app } from './app';
import { prisma } from './shared/database/prismaClient';

const PORT = process.env.PORT || 3333;

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    const handleExit = async () => {
      await prisma.$disconnect();
      server.close();
      process.exit(0);
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();
