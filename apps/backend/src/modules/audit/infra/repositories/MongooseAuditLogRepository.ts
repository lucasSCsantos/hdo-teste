import { CreateAuditLogInput, AuditLogModel, AuditLog } from '@hdo-teste-tecnico/shared/data-audit';
import { IAuditLogRepository } from '../../domain/repositories/IAuditLogRepository';

export class MongoAuditLogRepository implements IAuditLogRepository {
  async create(log: CreateAuditLogInput): Promise<void> {
    await AuditLogModel.create(log);
  }

  async list(): Promise<AuditLog[]> {
    return await AuditLogModel.find().sort({ createdAt: -1 }).exec();
  }
}
