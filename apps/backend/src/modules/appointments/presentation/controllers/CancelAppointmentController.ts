import { Request, Response } from 'express';
import { CancelAppointmentUseCase } from '../../application/usecases/CancelAppointmentUseCase';

export class CancelAppointmentController {
  constructor(private useCase: CancelAppointmentUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;
    const result = await this.useCase.execute({ id: +id, userId: +userId, ...req.body });
    return res.status(204).json(result);
  }
}
