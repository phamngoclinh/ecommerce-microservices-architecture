import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistencyModule } from '../persistency/persistency.module';
import { CartModule } from './cart.module';
import { OrderModule } from './order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistencyModule,
    OrderModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
