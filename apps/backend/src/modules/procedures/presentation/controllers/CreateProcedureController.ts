import { Request, Response } from 'express';
import { CreateProcedureUseCase } from '../../application/usecases/CreateProcedureUseCase';

export class CreateProcedureController {
  constructor(private useCase: CreateProcedureUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.body);
    return res.status(201).json(result);
  }
}
