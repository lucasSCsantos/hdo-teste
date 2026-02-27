import { Request, Response } from 'express';
import { CreateAppointmentUseCase } from '../../application/usecases/CreateAppointmentUseCase';

export class CreateAppointmentController {
  constructor(private useCase: CreateAppointmentUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const userId = req.user!.id;
    const result = await this.useCase.execute({ ...req.body, userId: +userId });
    return res.status(201).json(result);
  }
}
