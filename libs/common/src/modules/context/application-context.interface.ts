import { ClsStore } from 'nestjs-cls';

type Source = 'HTTP_API' | 'CRON_JOB' | 'SYSTEM_JOB' | 'QUEUE_JOB';

export interface ApplicationContextStore extends ClsStore {
  source: Source;
  userId: string;
  userRole: string;
  scope: string;
}

export interface IApplicationContext {
  getUserId(): string | undefined;
  getUserRole(): string | undefined;
  getUser(): { id: string; roles: string[]; permissions: string[] } | undefined;
}

export const APPLICATION_CONTEXT = Symbol('ApplicationContext');
