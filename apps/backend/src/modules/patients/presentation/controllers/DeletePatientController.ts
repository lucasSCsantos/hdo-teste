import { Request, Response } from 'express';
import { DeletePatientUseCase } from '../../application/usecases/DeletePatientUseCase';

export class DeletePatientController {
  constructor(private useCase: DeletePatientUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.useCase.execute({ id: +id });
    return res.status(204).json(result);
  }
}
