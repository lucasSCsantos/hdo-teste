import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '../../domain/services/ITokenService';

export class JwtTokenService implements ITokenService {
  generate(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
  }

  verify(token: string): TokenPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  }
}
