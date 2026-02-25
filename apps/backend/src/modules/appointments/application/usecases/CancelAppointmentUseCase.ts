import { Appointment } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface InputDTO extends Partial<Appointment> {
  id: number;
  cancellationReason: string;
}

export class CancelAppointmentUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(data: InputDTO) {
    if (!data.cancellationReason) {
      throw new AppError('Cancellation reason is required');
    }

    const appointment = await this.repo.cancel(data.id!, data.cancellationReason);

    return appointment;
  }
}
