import { Appointment } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { IProcedureRepository } from '../../../procedures/domain/repositories/IProcedureRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IAuditLogRepository } from '../../../audit/domain/repositories/IAuditLogRepository';
import { IPatientRepository } from '../../../patients/domain/repositories/IPatientRepository';

interface InputDTO extends Partial<Appointment> {
  patientId: number;
  procedureId: number;
  startTime: Date;
  userId: number;
}

export class CreateAppointmentUseCase {
  constructor(
    private repo: IAppointmentRepository,
    private procedureRepo: IProcedureRepository,
    private patientRepo: IPatientRepository,
    private auditRepo: IAuditLogRepository,
  ) {}

  async execute(data: InputDTO) {
    const procedure = await this.procedureRepo.findById(+data.procedureId);

    if (!procedure) {
      throw new AppError('Procedure not found', 404);
    }

    const patient = await this.patientRepo.findById(+data.patientId);

    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    const conflict = await this.repo.findConflict(data as Appointment);

    if (conflict) {
      throw new AppError('Appointment conflict', 400);
    }

    const startTime = new Date(data.startTime);
    const endTime = new Date(startTime.getTime() + procedure.durationMin * 60000);

    try {
      const appointment = await this.repo.create({
        patientId: data.patientId,
        procedureId: data.procedureId,
        startTime,
        endTime,
      });

      if (appointment)
        await this.auditRepo.create({
          action: 'CREATE_APPOINTMENT',
          actorId: data.userId,
          entityId: appointment.id,
          entityType: 'APPOINTMENT',
          metadata: { ...appointment },
        });

      return appointment;
    } catch (err) {
      throw new AppError(`Failed to create appointment.`, 500);
    }
  }
}
