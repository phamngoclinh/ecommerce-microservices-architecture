import { NatsBootstrapService } from '@libs/common/infrastructure/event-bus/nats/nats-bootstrap.service';
import { DatabaseMigrations } from '@libs/common/infrastructure/persistency/database/database-migrations';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import PaymentDataSource from './infrastructure/persistency/database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('PAYMENT_APP_PORT') || 4005;

  NatsBootstrapService.bootstrap(app);

  await DatabaseMigrations.autoMigrations(PaymentDataSource);
  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
