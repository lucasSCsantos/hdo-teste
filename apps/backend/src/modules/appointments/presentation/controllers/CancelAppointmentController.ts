import { Request, Response } from 'express';
import { CancelAppointmentUseCase } from '../../application/usecases/CancelAppointmentUseCase';

export class CancelAppointmentController {
  constructor(private useCase: CancelAppointmentUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.body);
    return res.status(204).json(result);
  }
}
