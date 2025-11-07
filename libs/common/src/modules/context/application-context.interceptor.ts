/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { ApplicationContextStore } from './application-context.interface';

@Injectable()
export class ApplicationContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService<ApplicationContextStore>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return this.cls.run(() => {
      const req = context.switchToHttp().getRequest<Request>();

      if (req['user']) {
        this.cls.set('source', 'HTTP_API');
        this.cls.set('userId', req['user'].id);
        this.cls.set('userRole', req['user'].role);
        this.cls.set('scope', req['user'].scope);
        // this.cls.set('tenantId', req['user'].tenantId);
      }

      return next.handle();
    });
  }
}
