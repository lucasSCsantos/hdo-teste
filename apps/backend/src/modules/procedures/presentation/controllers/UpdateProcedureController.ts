import { Request, Response } from 'express';
import { UpdateProcedureUseCase } from '../../application/usecases/UpdateProcedureUseCase';

export class UpdateProcedureController {
  constructor(private useCase: UpdateProcedureUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(+req.params.id, req.body);
    return res.status(204).json(result);
  }
}
