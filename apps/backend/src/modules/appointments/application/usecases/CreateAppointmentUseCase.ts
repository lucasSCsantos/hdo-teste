import { Appointment } from '@hdo-teste-tecnico/shared/data-access';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { IProcedureRepository } from '../../../procedures/domain/repositories/IProcedureRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IAuditLogRepository } from '../../../audit/domain/repositories/IAuditLogRepository';
import { IPatientRepository } from '../../../patients/domain/repositories/IPatientRepository';
import { IGoogleCalendarEventService } from '../../domain/services/IGoogleCalendarEventService';
import { IAuthRepository } from '../../../auth/domain/repositories/IAuthRepository';

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
    private authRepository: IAuthRepository,
    private googleCalendarService?: IGoogleCalendarEventService,
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

      // Attempt to sync with Google Calendar (non-blocking)
      if (appointment && this.googleCalendarService && process.env.GOOGLE_CALENDAR_SYNC_ENABLED === 'true') {
        this.syncToGoogleCalendar(appointment, data.userId, patient, procedure).catch((error) => {
          console.error(`Failed to sync appointment ${appointment.id} to Google Calendar:`, error);
        });
      }

      return appointment;
    } catch (err) {
      throw new AppError(`Failed to create appointment.`, 500);
    }
  }

  private async syncToGoogleCalendar(
    appointment: Appointment,
    userId: number,
    patient: any,
    procedure: any
  ): Promise<void> {
    try {
      const refreshToken = await this.authRepository.getGoogleRefreshToken(userId);
      if (!refreshToken) {
        return; // User hasn't connected Google Calendar
      }

      const user = await this.authRepository.findById(userId);
      const timezone = user?.timezone || 'UTC';

      const { eventId } = await this.googleCalendarService!.createEvent(
        {
          id: appointment.id,
          patientId: appointment.patientId,
          procedureId: appointment.procedureId,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          patient: { name: patient.name },
          procedure: { description: procedure.description, durationMin: procedure.durationMin },
        },
        timezone,
        refreshToken
      );

      // Update appointment with Google Event ID
      await this.repo.updateGoogleEventId(appointment.id, eventId);
    } catch (error) {
      // Non-blocking: log error but don't throw
      console.error('Google Calendar sync error:', error);
    }
  }
}
