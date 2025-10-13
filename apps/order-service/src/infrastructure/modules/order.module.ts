import { IValidator } from '@libs/common/validators/validator';
import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from '@order/application/use-cases/orders/create-order.usecase';
import { GetOrderUseCase } from '@order/application/use-cases/orders/get-order.usecase';
import { GetOrdersUseCase } from '@order/application/use-cases/orders/get-orders.usecase';
import {
  GetOrderContext,
  GetOrderValidatorChain,
} from '@order/application/validators/get-order.validator';
import { OrderController } from '@order/presentation/controlers/order.controller';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    GetOrdersUseCase,
    GetOrderUseCase,

    // validators
    {
      provide: IValidator<GetOrderContext>,
      useClass: GetOrderValidatorChain,
    },
  ],
})
export class OrderModule {}
