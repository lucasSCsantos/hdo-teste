import { CreateAppointmentUseCase } from '../../../modules/appointments/application/usecases/CancelAppointmentUseCase';
import FakeAppointmentRepository from '../../fakes/fakeAppointmentRepository';
import { Appointment } from '@hdo-teste-tecnico/shared/data-access';

describe('CreateAppointmentUseCase', () => {
  it('should create appointment if no conflict', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:00:00'),
    };

    const result = await useCase.execute(newAppointment);

    expect(result.end).toBeDefined();
  });

  it('should not allow conflict', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 2,
      startTime: new Date('2026-02-27T10:30:00'),
    };

    await expect(useCase.execute(newAppointment)).rejects.toThrow();
  });
});
