import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

export class LoginController {
  constructor(private useCase: LoginUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const result = await this.useCase.execute({
      email,
      password,
    });

    return res.status(200).json(result);
  }
}
