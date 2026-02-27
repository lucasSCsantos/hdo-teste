import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const auditLogSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['LOGIN', 'CREATE_APPOINTMENT', 'CANCEL_APPOINTMENT'],
    },
    actorId: {
      type: Number,
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ['APPOINTMENT', 'USER'],
    },
    entityId: { type: Number, required: true },
    metadata: { type: Schema.Types.Mixed, required: false },
  },
  { timestamps: true },
);

export type AuditLog = InferSchemaType<typeof auditLogSchema> & { _id: Types.ObjectId };
export type CreateAuditLogInput = Omit<AuditLog, 'createdAt' | 'updatedAt' | '_id'>;

export const AuditLogModel = model('AuditLog', auditLogSchema);
