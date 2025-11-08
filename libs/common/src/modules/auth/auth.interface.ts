export interface AuthPayload {
  id: string;
  displayName: string;
  role: string;
  scope: string;
}

export type Role = 'admin' | 'user' | 'owner';
