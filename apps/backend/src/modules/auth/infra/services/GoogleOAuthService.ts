import { google } from 'googleapis';
import { IGoogleOAuthService } from '../../domain/services/IGoogleOAuthService';

export class GoogleOAuthService implements IGoogleOAuthService {
  private oauth2Client: google.auth.OAuth2;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUri: string
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUri
    );
  }

  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });
  }

  async exchangeCodeForTokens(
    code: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt?: number;
  }> {
    const { tokens } = await this.oauth2Client.getToken(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Failed to obtain access and refresh tokens from Google');
    }

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expiry_date,
    };
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<{
    accessToken: string;
    expiresAt?: number;
  }> {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const { credentials } = await this.oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('Failed to refresh access token');
    }

    return {
      accessToken: credentials.access_token,
      expiresAt: credentials.expiry_date,
    };
  }
}
