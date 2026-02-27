import { ListAppointmentsUseCase } from '../../../modules/appointments/application/usecases/ListAppointmentsUseCase';
import FakeAppointmentRepository from '../../fakes/fakeAppointmentRepository';
import { Appointment, AppointmentStatus } from '@hdo-teste-tecnico/shared/data-access';

describe('ListAppointmentsUseCase', () => {
  it('should list all appointments', async () => {
    const repo = new FakeAppointmentRepository();
    const useCase = new ListAppointmentsUseCase(repo as any);

    const newAppointments: Partial<Appointment>[] = [
      {
        id: 1,
        patientId: 1,
        procedureId: 2,
        startTime: new Date('2026-02-27T10:00:00'),
        endTime: new Date('2026-02-27T10:30:00'),
        status: AppointmentStatus['SCHEDULED'],
        createdAt: new Date('2026-01-27T11:00:00'),
      },
      {
        id: 2,
        patientId: 2,
        procedureId: 3,
        startTime: new Date('2026-02-27T11:00:00'),
        endTime: new Date('2026-02-27T11:30:00'),
        status: AppointmentStatus['SCHEDULED'],
        createdAt: new Date('2026-01-27T11:00:00'),
      },
    ];

    newAppointments.map(a => repo.create(a));

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });
});
