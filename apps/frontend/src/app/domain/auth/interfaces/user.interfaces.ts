export interface User {
  id: number | null;
  email: string | null;
  password: string | null;
  name: string | null;
  refreshToken: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
