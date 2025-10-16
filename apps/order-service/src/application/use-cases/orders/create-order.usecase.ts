import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { MapInventoryItemHandler } from '@order/application/handlers/create-order/map-inventory-item.handler';
import { SendCreatedOrderEventHandler } from '@order/application/handlers/create-order/send-created-order-event.handler';
import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { Order } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CheckStockHandler } from '../../handlers/create-order/check-stock.handler';
import {
  CreateOrderContext,
  CreateOrderHandler,
} from '../../handlers/create-order/create-order.handler';
import { PaymentHandler } from '../../handlers/create-order/payment.handler';
import { SaveOrderHandler } from '../../handlers/create-order/save-order.handler';
import { ValidationHandler } from '../../handlers/create-order/validation.handler';

interface CreateOrderInput {
  order: Order;
  paymentMethod: string;
}

export class CreateOrderUseCase extends IUsecase<CreateOrderInput, Order> {
  private orderCreationChain: CreateOrderHandler;

  constructor(
    private readonly ordersRepository: IOrderRepository,
    private readonly inventoryGateway: IInventoryGateway,
    private readonly eventPublister: IEventPublisher,
  ) {
    super();

    const validationHandler = new ValidationHandler();
    const mapInventoryItemHandler = new MapInventoryItemHandler(this.inventoryGateway);
    const checkStockHandler = new CheckStockHandler(this.inventoryGateway);
    const saveOrderHandler = new SaveOrderHandler(this.ordersRepository);
    const paymentHandler = new PaymentHandler(this.ordersRepository);
    const sendCreatedOrderEventHandler = new SendCreatedOrderEventHandler(this.eventPublister);
    validationHandler
      .setNext(mapInventoryItemHandler)
      .setNext(checkStockHandler)
      .setNext(saveOrderHandler)
      .setNext(paymentHandler)
      .setNext(sendCreatedOrderEventHandler);
    this.orderCreationChain = validationHandler;
  }

  async execute(input: CreateOrderInput): Promise<Order> {
    const context: CreateOrderContext = {
      order: input.order,
      paymentMethod: input.paymentMethod,
    };
    await this.orderCreationChain.handle(context);
    return context.order;
  }
}
