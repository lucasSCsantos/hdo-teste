import { Request, Response } from 'express';
import { ListProceduresUseCase } from '../../application/usecases/ListProceduresUseCase';

export class ListProceduresController {
  constructor(private useCase: ListProceduresUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute();
    return res.status(200).json(result);
  }
}
