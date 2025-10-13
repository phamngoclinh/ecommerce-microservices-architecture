import { Injectable } from '@nestjs/common';
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
import { IUsecase } from '../base.usecase';

interface CreateOrderInput {
  order: Order;
  paymentMethod: string;
}

@Injectable()
export class CreateOrderUseCase extends IUsecase<CreateOrderInput, Order> {
  private orderCreationChain: OrderCreationHandler;

  constructor(private readonly ordersRepository: IOrderRepository) {
    super();

    const validation = new ValidationHandler();
    const checkStock = new CheckStockHandler(this.ordersRepository);
    const saveOrder = new SaveOrderHandler(this.ordersRepository);
    const payment = new PaymentHandler(this.ordersRepository);
    const confirmation = new ConfirmationHandler(this.ordersRepository);
    const complete = new CompleteHandler(this.ordersRepository);
    validation
      .setNext(checkStock)
      .setNext(saveOrder)
      .setNext(payment)
      .setNext(confirmation)
      .setNext(complete);
    this.orderCreationChain = validation;
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
