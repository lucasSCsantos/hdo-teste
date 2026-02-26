import { Request, Response } from 'express';
import { GetUserUseCase } from '../../application/usecases/GetUserUseCase';

export class GetUserController {
  constructor(private useCase: GetUserUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.user!.id;

    const result = await this.useCase.execute(+userId);

    return res.status(200).json(result);
  }
}
