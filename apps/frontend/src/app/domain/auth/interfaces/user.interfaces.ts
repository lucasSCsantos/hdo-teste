export interface User {
  id: number | null;
  email: string | null;
  password: string | null;
  name: string | null;
  refreshToken: string | null;
  googleRefreshToken?: string | null;
  timezone?: string | null;
  googleSyncEnabled?: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
