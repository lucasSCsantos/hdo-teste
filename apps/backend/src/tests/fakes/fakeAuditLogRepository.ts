import { AuditLog, CreateAuditLogInput } from '@hdo-teste-tecnico/shared/data-audit';

export default class FakeAuditLogRepository {
  logs: AuditLog[] = [];

  async create(log: CreateAuditLogInput): Promise<void> {
    this.logs.push(log as unknown as AuditLog);
  }

  async list(): Promise<AuditLog[]> {
    return this.logs;
  }
}
