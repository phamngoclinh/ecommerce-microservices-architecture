import { Module } from '@nestjs/common';
import { CartModule } from './cart.module';
import { OrderModule } from './order.module';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule, OrderModule, CartModule],
  controllers: [],
  providers: [],
})
export class RootModule {}
