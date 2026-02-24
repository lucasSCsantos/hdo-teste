import mongoose, { Schema, Document } from 'mongoose';

// Interface para tipagem no TypeScript
export interface IAuditLog extends Document {
  action: 'LOGIN' | 'CREATE_AGENDAMENTO' | 'CANCEL_AGENDAMENTO';
  userId: string;
  details?: any;
  createdAt: Date;
}

// Definição do Schema do Mongoose
const AuditLogSchema: Schema = new Schema({
  action: {
    type: String,
    required: true,
    enum: ['LOGIN', 'CREATE_APPOINTMENT', 'CANCEL_APPOINTMENT'],
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  details: {
    type: Schema.Types.Mixed,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d',
  },
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema, 'audit_logs');
