import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IEventBusClient } from '../event-bus-client.interface';

@Injectable()
export class NatsClientService extends IEventBusClient {
  constructor(private readonly configService: ConfigService) {
    super();

    const natsHost = this.configService.get<string>('NATS_HOST');

    if (!natsHost) throw Error('Missing configuration for NATS_HOST');

    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [natsHost],
      },
    });
  }
}
