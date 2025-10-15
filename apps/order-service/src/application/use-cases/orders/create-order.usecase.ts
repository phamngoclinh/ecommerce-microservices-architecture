import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { MapInventoryItemHandler } from '@order/application/handlers/order-creation/map-inventory-item.handler';
import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { Order } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CheckStockHandler } from '../../handlers/order-creation/check-stock.handler';
import { CompleteHandler } from '../../handlers/order-creation/complete.handler';
import { ConfirmationHandler } from '../../handlers/order-creation/confirmation.handler';
import {
  OrderCreationContext,
  OrderCreationHandler,
} from '../../handlers/order-creation/order-creation.handler';
import { PaymentHandler } from '../../handlers/order-creation/payment.handler';
import { SaveOrderHandler } from '../../handlers/order-creation/save-order.handler';
import { ValidationHandler } from '../../handlers/order-creation/validation.handler';

interface CreateOrderInput {
  order: Order;
  paymentMethod: string;
}

export class CreateOrderUseCase extends IUsecase<CreateOrderInput, Order> {
  private orderCreationChain: OrderCreationHandler;

  constructor(
    private readonly ordersRepository: IOrderRepository,
    private readonly inventoryGateway: IInventoryGateway,
  ) {
    super();

    const validationHandler = new ValidationHandler();
    const mapInventoryItemHandler = new MapInventoryItemHandler(this.inventoryGateway);
    const checkStockHandler = new CheckStockHandler(this.inventoryGateway);
    const saveOrderHandler = new SaveOrderHandler(this.ordersRepository, this.inventoryGateway);
    const paymentHandler = new PaymentHandler(this.ordersRepository);
    const confirmationHandler = new ConfirmationHandler(
      this.ordersRepository,
      this.inventoryGateway,
    );
    const completeHandler = new CompleteHandler(this.ordersRepository, this.inventoryGateway);
    validationHandler
      .setNext(mapInventoryItemHandler)
      .setNext(checkStockHandler)
      .setNext(saveOrderHandler)
      .setNext(paymentHandler)
      .setNext(confirmationHandler)
      .setNext(completeHandler);
    this.orderCreationChain = validationHandler;
  }

  async execute(input: CreateOrderInput): Promise<Order> {
    const context: OrderCreationContext = {
      order: input.order,
      paymentMethod: input.paymentMethod,
    };
    await this.orderCreationChain.handle(context);
    return context.order;
  }
}
