/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CRONJOB_USER_ID } from '@libs/common/application/constants/system-ids';
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ApplicationContextStore } from './application-context.interface';

@Injectable()
export class ApplicationContextCron {
  constructor(private readonly cls: ClsService<ApplicationContextStore>) {}

  run(callback: () => Promise<void>) {
    return this.cls.run(async () => {
      this.cls.set('source', 'CRON_JOB');
      this.cls.set('userId', CRONJOB_USER_ID);
      this.cls.set('userRole', '');
      this.cls.set('scope', '');
      // this.cls.set('tenantId', req['user'].tenantId);

      await callback();
    });
  }
}
