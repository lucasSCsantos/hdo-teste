import { Request, Response } from 'express';
import { DeleteProcedureUseCase } from '../../application/usecases/DeleteProcedureUseCase';

export class DeleteProcedureController {
  constructor(private useCase: DeleteProcedureUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.useCase.execute({ id: +id });
    return res.status(204).json(result);
  }
}
