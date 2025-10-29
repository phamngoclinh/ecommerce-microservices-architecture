import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export class NatsBootstrapService {
  static bootstrap(app: INestApplication) {
    const configService = app.get(ConfigService);

    const natsHost = configService.get<string>('NATS_HOST');

    if (!natsHost) throw Error('Missing configuration for NATS_HOST');

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.NATS,
      options: {
        servers: [natsHost],
      },
    });
  }
}
