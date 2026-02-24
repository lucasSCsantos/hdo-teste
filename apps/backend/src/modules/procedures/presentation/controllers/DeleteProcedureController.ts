import { Request, Response } from 'express';
import { DeleteProcedureUseCase } from '../../application/usecases/DeleteProcedureUseCase';

export class DeleteProcedureController {
  constructor(private useCase: DeleteProcedureUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.body);
    return res.status(204).json(result);
  }
}
