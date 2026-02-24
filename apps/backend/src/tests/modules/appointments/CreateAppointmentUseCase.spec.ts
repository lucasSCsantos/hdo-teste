import { CreateAppointmentUseCase } from '../../../src/modules/appointments/application/usecases/CreateAppointmentUseCase';]
import FakeAppointmentRepository from '../../fakes/fakeAppointmentRepository';



describe('CreateAppointmentUseCase', () => {
  it('should create appointment if no conflict', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repo as any);

    const result = await useCase.execute({
      patientId: '1',
      procedureId: '1',
      start: new Date('2026-02-27T10:00:00'),
      durationMin: 60,
    });

    expect(result.end).toBeDefined();
  });

  it('should not allow conflict', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repo as any);

    await useCase.execute({
      patientId: '1',
      procedureId: '1',
      start: new Date('2026-02-27T10:00:00'),
      durationMin: 60,
    });

    await expect(
      useCase.execute({
        patientId: '1',
        procedureId: '1',
        start: new Date('2026-02-27T10:30:00'),
        durationMin: 60,
      }),
    ).rejects.toThrow();
  });
});
