import { Request, Response } from 'express';
import { RefreshUseCase } from '../../application/usecases/RefreshUseCase';

export class RefreshController {
  constructor(private useCase: RefreshUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;
    const result = await this.useCase.execute(refreshToken);

    return res.status(200).json(result);
  }
}
