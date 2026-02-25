import { Request, Response } from 'express';
import { UpdatePatientUseCase } from '../../application/usecases/UpdatePatientUseCase';

export class UpdatePatientController {
  constructor(private useCase: UpdatePatientUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(+req.params.id, req.body);
    return res.status(204).json(result);
  }
}
