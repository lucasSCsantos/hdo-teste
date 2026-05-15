import { Request, Response } from 'express';
import { IGoogleOAuthService } from '../../modules/auth/domain/services/IGoogleOAuthService';

export class GoogleAuthUrlController {
  constructor(private googleOAuthService: IGoogleOAuthService) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const authUrl = this.googleOAuthService.getAuthUrl();
      return res.status(200).json({ authUrl });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate Google auth URL' });
    }
  }
}
