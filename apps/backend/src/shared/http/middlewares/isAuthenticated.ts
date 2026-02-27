import { JwtTokenService } from '../../../modules/auth/infra/tokens/JwtTokenService';
import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  const tokenService = new JwtTokenService();

  try {
    const decoded = tokenService.verify(token);

    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }

    req.user = { id: decoded.sub };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
