import { CancelAppointmentUseCase } from '../../../modules/appointments/application/usecases/CancelAppointmentUseCase';
import FakeAppointmentRepository from '../../fakes/fakeAppointmentRepository';
import { Appointment } from '@hdo-teste-tecnico/shared/data-access';

describe('CancelAppointmentUseCase', () => {
  it('should cancel an appointment with reason', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new CancelAppointmentUseCase(repo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:00:00'),
      cancellationReason: 'Patient requested cancellation',
    };

    const appointment = await repo.create(newAppointment);

    const result = await useCase.execute(appointment as any);
    console.log(result);
    expect(result).toBeDefined();
  });

  it('should not allow an appointment cancellation without reason', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new CancelAppointmentUseCase(repo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:30:00'),
    };

    await expect(useCase.execute(newAppointment as any)).rejects.toThrow();
  });
});
