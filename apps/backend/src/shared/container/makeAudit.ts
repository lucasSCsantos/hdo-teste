import { MongoAuditLogRepository } from '../../modules/audit/infra/repositories/MongooseAuditLogRepository';
import { ListAuditLogUseCase } from '../../modules/audit/application/usecases/ListAuditLogsUseCase';
import { ListAuditLogController } from '../../modules/audit/presentation/controllers/ListAuditLogController';

export function makeListAuditController() {
  const repo = new MongoAuditLogRepository();
  const useCase = new ListAuditLogUseCase(repo as any);
  return new ListAuditLogController(useCase);
}
