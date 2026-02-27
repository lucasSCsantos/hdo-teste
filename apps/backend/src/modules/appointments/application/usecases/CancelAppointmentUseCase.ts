import { Appointment } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IAuditLogRepository } from '../../../audit/domain/repositories/IAuditLogRepository';

interface InputDTO extends Partial<Appointment> {
  id: number;
  cancellationReason: string;
  userId: number;
}

export class CancelAppointmentUseCase {
  constructor(
    private repo: IAppointmentRepository,
    private auditRepo: IAuditLogRepository,
  ) {}

  async execute(data: InputDTO) {
    if (!data.cancellationReason) {
      throw new AppError('Cancellation reason is required');
    }

    try {
      const appointment = await this.repo.cancel(data.id!, data.cancellationReason);

      if (appointment)
        await this.auditRepo.create({
          action: 'CANCEL_APPOINTMENT',
          actorId: data.userId,
          entityId: appointment.id,
          entityType: 'APPOINTMENT',
          metadata: { ...appointment },
        });

      return appointment;
    } catch (err) {
      throw new AppError('Failed to cancel appointment', 500);
    }
  }
}
