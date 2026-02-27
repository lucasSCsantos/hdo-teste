import { Request, Response } from 'express';
import { ListAppointmentsUseCase } from '../../application/usecases/ListAppointmentsUseCase';
import { AppointmentStatus } from '@hdo-teste-tecnico/shared/data-access';

export class ListAppointmentsController {
  constructor(private useCase: ListAppointmentsUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.query as unknown as { status: AppointmentStatus; patientId?: string; startDate: Date; endDate: Date });
    return res.status(200).json(result);
  }
}
