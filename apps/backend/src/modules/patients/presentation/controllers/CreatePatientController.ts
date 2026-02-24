import { Request, Response } from 'express';
import { CreatePatientUseCase } from '../../application/usecases/CreatePatientUseCase';

export class CreatePatientController {
  constructor(private useCase: CreatePatientUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute(req.body);
    return res.status(201).json(result);
  }
}
