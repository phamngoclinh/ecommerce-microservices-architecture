import { EventPublisherService } from '@libs/common/application/ports/event-publisher';
import { RedisClientModule } from '@libs/common/infrastructure/event-bus/redis/redis-client.module';
import { RedisClientService } from '@libs/common/infrastructure/event-bus/redis/redis-client.service';
import { IValidator } from '@libs/common/validators/validator';
import { Module } from '@nestjs/common';
import { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { CompleteOrderUseCase } from '@order/application/use-cases/orders/complete-order.usecase';
import { ConfirmOrderUseCase } from '@order/application/use-cases/orders/confirm-order.usecase';
import { CreateOrderUseCase } from '@order/application/use-cases/orders/create-order.usecase';
import { GetOrderUseCase } from '@order/application/use-cases/orders/get-order.usecase';
import { GetOrdersUseCase } from '@order/application/use-cases/orders/get-orders.usecase';
import { ShipOrderUseCase } from '@order/application/use-cases/orders/ship-order.usecase';
import {
  GetOrderContext,
  GetOrderValidator,
} from '@order/application/validators/get-order.validator';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderController } from '@order/presentation/controllers/order.controller';
import { InventoryHttpModule } from '../adatpers/inventory-http.module';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule, InventoryHttpModule, RedisClientModule],
  controllers: [OrderController],
  providers: [
    {
      provide: CreateOrderUseCase,
      useFactory: (
        ordersRepository: IOrderRepository,
        inventoryGateway: IInventoryGateway,
        redisClient: RedisClientService,
      ) => {
        return new CreateOrderUseCase(
          ordersRepository,
          inventoryGateway,
          new EventPublisherService(redisClient),
        );
      },
      inject: [IOrderRepository, IInventoryGateway, RedisClientService],
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
    {
      provide: ConfirmOrderUseCase,
      useFactory: (ordersRepository: IOrderRepository, redisClient: RedisClientService) => {
        return new ConfirmOrderUseCase(ordersRepository, new EventPublisherService(redisClient));
      },
      inject: [IOrderRepository, RedisClientService],
    },
    {
      provide: ShipOrderUseCase,
      useFactory: (ordersRepository: IOrderRepository) => {
        return new ShipOrderUseCase(ordersRepository);
      },
      inject: [IOrderRepository],
    },
    {
      provide: CompleteOrderUseCase,
      useFactory: (ordersRepository: IOrderRepository, redisClient: RedisClientService) => {
        return new CompleteOrderUseCase(ordersRepository, new EventPublisherService(redisClient));
      },
      inject: [IOrderRepository, RedisClientService],
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
