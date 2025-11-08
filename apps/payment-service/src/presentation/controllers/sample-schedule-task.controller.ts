import * as applicationContextInterface from '@libs/common/modules/context/application-context.interface';
import { Controller, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(applicationContextInterface.APPLICATION_CONTEXT)
    private readonly applicationContext: applicationContextInterface.IApplicationContext,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.applicationContext.execute({ type: 'CRON_JOB' }, () => {
      console.log('Called when the current second is not 5');

      const source = this.applicationContext.getSource();
      const userId = this.applicationContext.getUserId();

      console.log('userId, source', userId, source);

      return from(Promise.resolve());
    });
  }
}
