import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export class RedisBootstrapService {
  static bootstrap(app: INestApplication) {
    const configService = app.get(ConfigService);

    const redisHost = configService.get<string>('REDIS_HOST');
    const redisPort = configService.get<number>('REDIS_PORT');

    if (!redisHost || !redisPort) throw Error('Missing configuration for redis');

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        host: redisHost,
        port: redisPort,
      },
    });
  }
}
