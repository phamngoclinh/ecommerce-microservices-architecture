import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('API_GATEWAY_APP_PORT') || 4001;

  await app.listen(appPort);
}
bootstrap();
