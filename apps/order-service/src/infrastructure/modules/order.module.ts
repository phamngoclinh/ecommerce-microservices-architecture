import { IValidator } from '@libs/common/validators/validator';
import { Module } from '@nestjs/common';
import { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { CreateOrderUseCase } from '@order/application/use-cases/orders/create-order.usecase';
import { GetOrderUseCase } from '@order/application/use-cases/orders/get-order.usecase';
import { GetOrdersUseCase } from '@order/application/use-cases/orders/get-orders.usecase';
import {
  GetOrderContext,
  GetOrderValidator,
} from '@order/application/validators/get-order.validator';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderController } from '@order/presentation/controlers/order.controller';
import { InventoryHttpModule } from '../gateways/inventory-http.module';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule, InventoryHttpModule],
  controllers: [OrderController],
  providers: [
    {
      provide: CreateOrderUseCase,
      useFactory: (ordersRepository: IOrderRepository, inventoryGateway: IInventoryGateway) => {
        return new CreateOrderUseCase(ordersRepository, inventoryGateway);
      },
      inject: [IOrderRepository, 'IInventoryGateway'],
    },
    {
      provide: GetOrdersUseCase,
      useFactory: (ordersRepository: IOrderRepository) => {
        return new GetOrdersUseCase(ordersRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: GetOrderUseCase,
      useFactory: (getOrderValidator: IValidator<GetOrderContext>) => {
        return new GetOrderUseCase(getOrderValidator);
      },
      inject: [IValidator<GetOrderContext>],
    },

    // validators
    {
      provide: IValidator<GetOrderContext>,
      useFactory: (ordersRepository: IOrderRepository) => {
        return new GetOrderValidator(ordersRepository);
      },
      inject: [IOrderRepository],
    },
  ],
})
export class OrderModule {}
