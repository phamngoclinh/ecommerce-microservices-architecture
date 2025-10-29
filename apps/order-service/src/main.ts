import { NatsBootstrapService } from '@libs/common/infrastructure/event-bus/nats/nats-bootstrap.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './infrastructure/modules/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { cors: true });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('ORDER_APP_PORT') || 4004;

  NatsBootstrapService.bootstrap(app);

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
