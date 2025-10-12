import { Module } from '@nestjs/common';
import { OrderUseCase } from '@order/application/use-cases/order.use-case';
import { OrderController } from '@order/presentation/order.controller';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule],
  controllers: [OrderController],
  providers: [OrderUseCase],
})
export class OrderModule {}
