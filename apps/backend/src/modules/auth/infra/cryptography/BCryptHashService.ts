import bcrypt from 'bcrypt';
import { IHashService } from '../../domain/services/IHashService';

export class BCryptHashService implements IHashService {
  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 10);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
