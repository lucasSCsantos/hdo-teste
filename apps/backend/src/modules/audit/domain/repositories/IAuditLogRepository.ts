import { CreateAuditLogInput } from '@hdo-teste-tecnico/shared/data-audit';

export interface IAuditLogRepository {
  create(log: CreateAuditLogInput): Promise<void>;
  list(): Promise<CreateAuditLogInput[]>;
}
