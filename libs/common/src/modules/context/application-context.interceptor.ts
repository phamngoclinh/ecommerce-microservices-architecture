import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
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
    switch (reqType) {
      case 'http':
        type = 'HTTP_API';
        break;
      case 'rpc':
        type = 'QUEUE_JOB';
        break;
    }

    return this.applicationContext.execute({ type, context }, () => {
      return next.handle();
    });
  }
}
