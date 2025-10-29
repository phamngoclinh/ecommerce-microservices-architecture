import { Module } from '@nestjs/common';
import { NatsClientService } from './nats-client.service';

@Module({
  imports: [],
  providers: [NatsClientService],
  exports: [NatsClientService],
})
export class NatsClientModule {}
