import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import type { Request } from 'express';
import { from } from 'rxjs';
import { APPLICATION_CONTEXT, IApplicationContext } from './application-context.interface';

@Injectable()
export class ApplicationContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(APPLICATION_CONTEXT)
    private readonly applicationContext: IApplicationContext,
  ) {}

  use(req: Request, res: any, next: (error?: any) => void) {
    const user = req['user'] ? { ...req['user'] } : undefined;

    this.applicationContext.execute({ type: 'HTTP_API', user }, () => {
      next();
      return from(Promise.resolve());
    });
  }
}
