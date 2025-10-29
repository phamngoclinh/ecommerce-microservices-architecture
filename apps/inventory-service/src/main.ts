import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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

  const appPort = configService.get<number>('INVENTORY_APP_PORT') || 4003;

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
