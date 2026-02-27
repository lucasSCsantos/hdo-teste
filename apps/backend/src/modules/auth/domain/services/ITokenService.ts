import { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  sub: string;
  type: 'access' | 'refresh';
}

export interface ITokenService {
  generate(payload: TokenPayload, expiresIn?: SignOptions['expiresIn']): string;
  verify(token: string): TokenPayload;
}
