import { EventPublisherService } from '@libs/common/application/ports/event-publisher';
import { NatsClientModule } from '@libs/common/infrastructure/event-bus/nats/nats-client.module';
import { NatsClientService } from '@libs/common/infrastructure/event-bus/nats/nats-client.service';
import { AuthModule } from '@libs/common/modules/auth/auth.module';
import { ApplicationContextModule } from '@libs/common/modules/context/application-context.module';
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
import { OrderSubcriber } from '@order/presentation/subcribers/order.subcriber';
import { InventoryHttpModule } from '../adatpers/inventory-http.module';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [
    AuthModule,
    ApplicationContextModule,
    PersistencyModule,
    InventoryHttpModule,
    NatsClientModule,
  ],
  controllers: [OrderController, OrderSubcriber],
  providers: [
    {
      provide: CreateOrderUseCase,
      useFactory: (
        ordersRepository: IOrderRepository,
        inventoryGateway: IInventoryGateway,
        publisherClient: NatsClientService,
      ) => {
        return new CreateOrderUseCase(
          ordersRepository,
          inventoryGateway,
          new EventPublisherService(publisherClient),
        );
      },
      inject: [IOrderRepository, IInventoryGateway, NatsClientService],
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
      useFactory: (ordersRepository: IOrderRepository, publisherClient: NatsClientService) => {
        return new ConfirmOrderUseCase(
          ordersRepository,
          new EventPublisherService(publisherClient),
        );
      },
      inject: [IOrderRepository, NatsClientService],
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
      useFactory: (ordersRepository: IOrderRepository, publisherClient: NatsClientService) => {
        return new CompleteOrderUseCase(
          ordersRepository,
          new EventPublisherService(publisherClient),
        );
      },
      inject: [IOrderRepository, NatsClientService],
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
