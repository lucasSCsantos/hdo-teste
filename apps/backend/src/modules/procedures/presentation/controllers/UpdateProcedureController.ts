import { Request, Response } from 'express';
import { UpdateProcedureUseCase } from '../../application/usecases/UpdateProcedureUseCase';

export class UpdateProcedureController {
  constructor(private useCase: UpdateProcedureUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.useCase.execute({ id: +id, ...req.body });
    return res.status(204).json(result);
  }
}
