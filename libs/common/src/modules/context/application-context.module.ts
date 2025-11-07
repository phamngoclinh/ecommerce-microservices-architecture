/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { APPLICATION_CONTEXT } from './application-context.interface';
import { ClsApplicationContextAdapter } from './cls-app-context.adapter';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: false,
        // Tự động gán request ID, rất hữu ích cho logging
        // generateId: true,
        // idGenerator: (req: Request) => req.headers['x-request-id'] || uuidv4(),
      },
    }),
  ],
  providers: [
    {
      provide: APPLICATION_CONTEXT,
      useClass: ClsApplicationContextAdapter,
    },
  ],
  exports: [
    {
      provide: APPLICATION_CONTEXT,
      useClass: ClsApplicationContextAdapter,
    },
  ],
})
export class ApplicationContextModule {}
