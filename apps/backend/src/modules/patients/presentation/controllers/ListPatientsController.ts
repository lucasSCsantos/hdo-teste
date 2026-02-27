import { Request, Response } from 'express';
import { ListPatientsUseCase } from '../../application/usecases/ListPatientsUseCase';

export class ListPatientsController {
  constructor(private useCase: ListPatientsUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute();
    return res.status(200).json(result);
  }
}
