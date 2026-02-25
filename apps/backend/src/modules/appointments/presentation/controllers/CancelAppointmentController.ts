import { Request, Response } from 'express';
import { CancelAppointmentUseCase } from '../../application/usecases/CancelAppointmentUseCase';

export class CancelAppointmentController {
  constructor(private useCase: CancelAppointmentUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id; // 👈 vem do middleware
    const result = await this.useCase.execute({ id, userId: +userId, ...req.body });
    return res.status(204).json(result);
  }
}
