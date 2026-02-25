import { CreateAppointmentUseCase } from '../../../modules/appointments/application/usecases/CreateAppointmentUseCase';
import FakeAppointmentRepository from '../../fakes/fakeAppointmentRepository';
import { Appointment } from '@hdo-teste-tecnico/shared/data-access';
import FakeProcedureRepository from '../../fakes/fakeProcedureRepository';
import { AppError } from '../../../shared/errors/AppError';

describe('CreateAppointmentUseCase', () => {
  it('should create appointment if no conflict', async () => {
    const repo = new FakeAppointmentRepository();
    const procedureRepo = new FakeProcedureRepository();
    const useCase = new CreateAppointmentUseCase(repo as any, procedureRepo as any);

    const newAppointment: Partial<Appointment> = {
      patientId: 1,
      procedureId: 1,
      startTime: new Date('2026-02-27T10:00:00'),
    };

    const result = await useCase.execute(newAppointment as any);

    expect(result.endTime).toBeDefined();
  });

  it('should not allow conflict', async () => {
    const repo = new FakeAppointmentRepository();
    const procedureRepo = new FakeProcedureRepository();
    const useCase = new CreateAppointmentUseCase(repo as any, procedureRepo as any);

    const newAppointment1: Partial<Appointment> = {
      patientId: 1,
      procedureId: 1,
      startTime: new Date('2026-02-27T10:10:00'),
    };

    const newAppointment2: Partial<Appointment> = {
      patientId: 1,
      procedureId: 1,
      startTime: new Date('2026-02-27T10:20:00'),
    };

    await useCase.execute(newAppointment1 as any);

    await expect(useCase.execute(newAppointment2 as any)).rejects.toBeInstanceOf(AppError);
  });
});
