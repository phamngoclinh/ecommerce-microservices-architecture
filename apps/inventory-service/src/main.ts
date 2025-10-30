import { NatsBootstrapService } from '@libs/common/infrastructure/event-bus/nats/nats-bootstrap.service';
import { DatabaseMigrations } from '@libs/common/infrastructure/persistency/database/database-migrations';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import InventoryDataSource from './infrastructure/persistency/database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('INVENTORY_APP_PORT') || 4003;

  NatsBootstrapService.bootstrap(app);

  await DatabaseMigrations.autoMigrations(InventoryDataSource);
  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
