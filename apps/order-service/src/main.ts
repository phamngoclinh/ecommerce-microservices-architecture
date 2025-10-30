import { NatsBootstrapService } from '@libs/common/infrastructure/event-bus/nats/nats-bootstrap.service';
import { DatabaseMigrations } from '@libs/common/infrastructure/persistency/database/database-migrations';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './infrastructure/modules/root.module';
import OrderDataSource from './infrastructure/persistency/database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { cors: true });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('ORDER_APP_PORT') || 4004;

  NatsBootstrapService.bootstrap(app);

  await DatabaseMigrations.autoMigrations(OrderDataSource);
  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
