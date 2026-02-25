import { Appointment } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { IProcedureRepository } from '../../../procedures/domain/repositories/IProcedureRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface InputDTO extends Partial<Appointment> {
  patientId: number;
  procedureId: number;
  startTime: Date;
}

export class CreateAppointmentUseCase {
  constructor(
    private repo: IAppointmentRepository,
    private procedureRepo: IProcedureRepository,
  ) {}

  async execute(data: InputDTO) {
    const procedure = await this.procedureRepo.findById(data.procedureId);

    if (!procedure) {
      throw new AppError('Procedure not found', 404);
    }

    const conflict = await this.repo.findConflict(data as Appointment);

    const endTime = new Date(data.startTime.getTime() + procedure?.durationMin * 60000);

    if (conflict) {
      throw new AppError('Appointment conflict');
    }

    const appointment = await this.repo.create({
      patientId: data.patientId,
      procedureId: data.procedureId,
      startTime: data.startTime,
      endTime,
    });

    return appointment;
  }
}
