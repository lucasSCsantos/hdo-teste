import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async () => {
  try {
    const mongoUrl = process.env['MONGO_URL'] || '';

    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB (Logs) conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

export default connectMongo;
