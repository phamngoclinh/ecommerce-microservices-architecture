import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthPayload } from '../auth/auth.interface';
import * as applicationContextInterface from './application-context.interface';

@Injectable()
export class ApplicationContextInterceptor implements NestInterceptor {
  constructor(
    @Inject(applicationContextInterface.APPLICATION_CONTEXT)
    private readonly applicationContext: applicationContextInterface.IApplicationContext,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqType: ContextType = context.getType();

    let type: applicationContextInterface.SourceType = 'SYSTEM_JOB';
    let user: AuthPayload | undefined = undefined;
    switch (reqType) {
      case 'http':
        {
          type = 'HTTP_API';
          const request = context.switchToHttp().getRequest<Request>();
          const requestUser = request['user'];
          user = requestUser ? { ...requestUser } : undefined;
        }
        break;
      case 'rpc':
        type = 'QUEUE_JOB';
        break;
    }

    return this.applicationContext.execute({ type, user }, () => {
      return next.handle();
    });
  }
}
