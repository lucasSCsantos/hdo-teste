import { AuditAction, AuditEntityType } from '../enums/audit.enum';

export interface AuditLog {
  id?: string;
  _id?: string;

  action: AuditAction;
  actorId: number;

  entityType: AuditEntityType;
  entityId: number;

  metadata?: unknown;

  createdAt: string;
  updatedAt: string;
}
