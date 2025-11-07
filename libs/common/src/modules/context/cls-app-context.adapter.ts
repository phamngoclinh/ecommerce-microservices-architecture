/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// infrastructure/context/cls-app-context.service.ts

import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ApplicationContextStore, IApplicationContext } from './application-context.interface';

@Injectable()
export class ClsApplicationContextAdapter implements IApplicationContext {
  constructor(private readonly cls: ClsService<ApplicationContextStore>) {}

  getUserId(): string | undefined {
    return this.cls.get('userId');
  }

  getUserRole(): string | undefined {
    return this.cls.get('userRole');
  }

  getUser(): { id: string; roles: string[]; permissions: string[] } | undefined {
    throw new Error('Method not implemented.');
  }

  // getTenantId(): string | undefined {
  //   return this.cls.get('tenantId');
  // }
}
