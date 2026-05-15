import { Request, Response } from 'express';
import { ConnectGoogleCalendarUseCase } from '../../application/usecases/ConnectGoogleCalendarUseCase';

export class ConnectGoogleCalendarController {
  constructor(private useCase: ConnectGoogleCalendarUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { code, timezone } = req.body;
    const userId = req.user!.id;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    const result = await this.useCase.execute({
      userId,
      code,
      timezone,
    });

    return res.status(200).json(result);
  }
}
