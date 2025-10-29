import { NatsBootstrapService } from '@libs/common/infrastructure/event-bus/nats/nats-bootstrap.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('INVENTORY_APP_PORT') || 4003;

  NatsBootstrapService.bootstrap(app);

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
