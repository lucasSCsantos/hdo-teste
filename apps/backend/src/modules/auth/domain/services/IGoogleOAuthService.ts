export interface IGoogleOAuthService {
  getAuthUrl(): string;

  exchangeCodeForTokens(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt?: number;
  }>;

  refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresAt?: number;
  }>;
}
