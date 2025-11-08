export interface AuthPayload {
  id: string;
  role: string;
  scope: string;
}

export type Role = 'admin' | 'user' | 'owner';
