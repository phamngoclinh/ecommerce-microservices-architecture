/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// infrastructure/http/middleware/cls-setup.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { ApplicationContextStore } from './application-context.interface';

@Injectable()
export class ApplicationContextMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService<ApplicationContextStore>) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.cls.run(() => {
      if (req['user']) {
        this.cls.set('userId', req['user'].id);
        this.cls.set('userRole', req['user'].role);
        this.cls.set('scope', req['user'].scope);
      }
      next();
    });
  }
}
