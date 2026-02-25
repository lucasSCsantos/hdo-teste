import { AppError } from '../../../shared/errors/AppError';
import { CancelAppointmentUseCase } from '../../../modules/appointments/application/usecases/CancelAppointmentUseCase';
import FakeAppointmentRepository from '../../fakes/fakeAppointmentRepository';
import FakeAuditLogRepository from '../../fakes/fakeAuditLogRepository';
import { Appointment } from '@hdo-teste-tecnico/shared/data-access';

describe('CancelAppointmentUseCase', () => {
  it('should cancel an appointment with reason', async () => {
    const repo = new FakeAppointmentRepository();
    const auditRepo = new FakeAuditLogRepository();
    const useCase = new CancelAppointmentUseCase(repo as any, auditRepo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:00:00'),
      cancellationReason: 'Patient requested cancellation',
    };

    const appointment = await repo.create(newAppointment);

    const result = await useCase.execute(appointment as any);

    expect(result).toBeDefined();
  });

  it('should cancel an appointment with reason and create audit', async () => {
    const repo = new FakeAppointmentRepository();
    const auditRepo = new FakeAuditLogRepository();
    const useCase = new CancelAppointmentUseCase(repo as any, auditRepo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:00:00'),
      cancellationReason: 'Patient requested cancellation',
    };

    const appointment = await repo.create(newAppointment);

    await useCase.execute(appointment as any);

    expect(auditRepo.logs[0].action).toBe('CANCEL_APPOINTMENT');
  });

  it('should not allow an appointment cancellation without reason', async () => {
    const repo = new FakeAppointmentRepository();
    const auditRepo = new FakeAuditLogRepository();
    const useCase = new CancelAppointmentUseCase(repo as any, auditRepo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:30:00'),
    };

    await expect(useCase.execute(newAppointment as any)).rejects.toBeInstanceOf(AppError);
  });
});
