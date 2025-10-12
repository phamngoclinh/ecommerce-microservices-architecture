import { Injectable } from '@nestjs/common';
import { CheckStockHandler } from './handlers/order-creation/check-stock.handler';
import { CompleteHandler } from './handlers/order-creation/complete.handler';
import { ConfirmationHandler } from './handlers/order-creation/confirmation.handler';
import {
  OrderCreationContext,
  OrderCreationHandler,
} from './handlers/order-creation/order-creation.handler';
import { PaymentHandler } from './handlers/order-creation/payment.handler';
import { SaveOrderHandler } from './handlers/order-creation/save-order.handler';
import { ValidationHandler } from './handlers/order-creation/validation.handler';
import { Order } from './models/order.model';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderServiceService {
  private chain: OrderCreationHandler;

  constructor(private readonly orderRepository: OrderRepository) {
    const validation = new ValidationHandler();
    const checkStock = new CheckStockHandler(this.orderRepository);
    const saveOrder = new SaveOrderHandler(this.orderRepository);
    const payment = new PaymentHandler(this.orderRepository);
    const confirmation = new ConfirmationHandler(this.orderRepository);
    const complete = new CompleteHandler(this.orderRepository);
    validation
      .setNext(checkStock)
      .setNext(saveOrder)
      .setNext(payment)
      .setNext(confirmation)
      .setNext(complete);
    this.chain = validation;
  }

  async createOrder(data: Order, paymentMethod: string): Promise<Order> {
    const context: OrderCreationContext = { order: data, paymentMethod };
    await this.chain.handle(context);
    return context.order;
  }

  getOrders(): Promise<Order[] | null> {
    return this.orderRepository.getOrders();
  }

  getOrder(id: number): Promise<Order | null> {
    return this.orderRepository.getOrder(id);
  }
}
