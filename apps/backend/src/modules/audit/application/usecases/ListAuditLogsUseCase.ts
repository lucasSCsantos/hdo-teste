import { IAuditLogRepository } from '../../domain/repositories/IAuditLogRepository';

export class ListAuditLogUseCase {
  constructor(private repo: IAuditLogRepository) {}

  async execute() {
    const appointments = await this.repo.list();

    return appointments;
  }
}
