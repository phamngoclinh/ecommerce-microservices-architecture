import { AuthMiddleware } from '@libs/common/modules/auth/auth.middleware';
import { AuthModule } from '@libs/common/modules/auth/auth.module';
import { ApplicationContextMiddleware } from '@libs/common/modules/context/application-context.middleware';
import { ApplicationContextModule } from '@libs/common/modules/context/application-context.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart.module';
import { OrderModule } from './order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrderModule,
    CartModule,
    // global modules
    AuthModule,
    ApplicationContextModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, ApplicationContextMiddleware).forRoutes('*');
  }
}
