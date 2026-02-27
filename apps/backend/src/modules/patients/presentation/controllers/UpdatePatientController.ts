import { Request, Response } from 'express';
import { UpdatePatientUseCase } from '../../application/usecases/UpdatePatientUseCase';

export class UpdatePatientController {
  constructor(private useCase: UpdatePatientUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.useCase.execute({ id: +id, ...req.body });
    return res.status(204).json(result);
  }
}
