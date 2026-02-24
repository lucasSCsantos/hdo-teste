import { Request, Response } from 'express';
import { DeletePatientUseCase } from '../../application/usecases/DeletePatientUseCase';

export class DeletePatientController {
  constructor(private useCase: DeletePatientUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.body);
    return res.status(204).json(result);
  }
}
