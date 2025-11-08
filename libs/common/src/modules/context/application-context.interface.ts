import {
  CRONJOB_USER_ID,
  GUEST_USER_ID,
  MESSAGE_QUEUE_LISTENER_ID,
  SYSTEM_USER_ID,
} from '@libs/common/application/constants/system-ids';
import { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';

export type SourceType = 'HTTP_API' | 'CRON_JOB' | 'SYSTEM_JOB' | 'QUEUE_JOB';

export interface ApplicationContextStore {
  source: SourceType;
  userId: string;
  userRole: string;
  scope: string;
}

export type RunCallbackType<T> = () => T;
export type RunOptionType = Record<string, any>;

export interface IApplicationContextInterface {
  run<T = any>(callback: RunCallbackType<T>): Observable<T>;
  run<T = any>(callback: RunCallbackType<T>): Observable<T>;
  set(key: string, value: any): void;
  get(key: string): any;
}

export abstract class IApplicationContext implements IApplicationContextInterface {
  abstract run<T = any>(callback: RunCallbackType<T>): Observable<T>;
  abstract run<T = any>(options: RunOptionType, callback: RunCallbackType<T>): Observable<T>;
  abstract set(key: any, value: any): void;
  abstract get(key: string): any;

  protected setContext(
    source: SourceType,
    userId: string,
    userRole: string = '',
    scope: string = '',
  ) {
    this.setSource(source);
    this.setUserId(userId);
    this.setUserRole(userRole);
    this.setScope(scope);
  }

  execute(
    options: {
      type: SourceType;
      context?: ExecutionContext;
    },
    callback: () => Observable<any>,
  ) {
    return this.run(() => {
      switch (options.type) {
        case 'HTTP_API':
          {
            if (!options.context) throw new Error('ApplocationContext is missing ExecutionContext');
            const req = options.context.switchToHttp().getRequest<Request>();
            if (req['user']) {
              const { id, role, scope } = req['user'];
              this.setContext('HTTP_API', id, role, scope);
            } else {
              this.setContext('HTTP_API', GUEST_USER_ID);
            }
          }
          break;
        case 'QUEUE_JOB':
          this.setContext('QUEUE_JOB', MESSAGE_QUEUE_LISTENER_ID);
          break;
        case 'CRON_JOB':
          this.setContext('CRON_JOB', CRONJOB_USER_ID);
          break;
        default:
          this.setContext('SYSTEM_JOB', SYSTEM_USER_ID);
      }

      return callback();
    });
  }

  getUserId(): string | undefined {
    return this.get('userId') as string | undefined;
  }

  getUser(): { id: string; roles: string[]; permissions: string[] } | undefined {
    throw new Error('Method not implemented.');
  }

  getUserRole(): string | undefined {
    return this.get('userRole') as string | undefined;
  }

  getScope(): string | undefined {
    return this.get('scope') as string | undefined;
  }

  getSource(): string | undefined {
    return this.get('source') as string | undefined;
  }

  setUserId(id: string) {
    this.set('userId', id);
  }

  setUserRole(role: string) {
    this.set('userRole', role);
  }

  setScope(scope: string) {
    this.set('scope', scope);
  }

  setSource(source: SourceType) {
    this.set('source', source);
  }
}

export const APPLICATION_CONTEXT = Symbol('ApplicationContext');
