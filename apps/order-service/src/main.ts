import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RootModule } from './infrastructure/modules/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { cors: true });

  const configService = app.get(ConfigService);

  const redisHost = configService.get<string>('REDIS_HOST') || 'localhost';
  const redisPort = configService.get<number>('REDIS_PORT') || 6379;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
    },
  });

  const appPort = configService.get<number>('ORDER_APP_PORT') || 4004;

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
