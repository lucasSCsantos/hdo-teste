import { Request, Response } from 'express';
import { ListAppointmentsUseCase } from '../../application/usecases/ListAppointmentsUseCase';

export class ListAppointmentsController {
  constructor(private useCase: ListAppointmentsUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute();
    return res.status(200).json(result);
  }
}
