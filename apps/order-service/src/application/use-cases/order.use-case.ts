import { Injectable } from '@nestjs/common';
import { Order } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { CheckStockHandler } from '../handlers/order-creation/check-stock.handler';
import { CompleteHandler } from '../handlers/order-creation/complete.handler';
import { ConfirmationHandler } from '../handlers/order-creation/confirmation.handler';
import {
  OrderCreationContext,
  OrderCreationHandler,
} from '../handlers/order-creation/order-creation.handler';
import { PaymentHandler } from '../handlers/order-creation/payment.handler';
import { SaveOrderHandler } from '../handlers/order-creation/save-order.handler';
import { ValidationHandler } from '../handlers/order-creation/validation.handler';

@Injectable()
export class OrderUseCase {
  private orderCreationChain: OrderCreationHandler;

  constructor(private readonly orderRepository: IOrderRepository) {
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
    this.orderCreationChain = validation;
  }

  async createOrder(data: Order, paymentMethod: string): Promise<Order> {
    const context: OrderCreationContext = { order: data, paymentMethod };
    await this.orderCreationChain.handle(context);
    return context.order;
  }

  getOrders(): Promise<Order[] | null> {
    return this.orderRepository.getOrders();
  }

  getOrder(id: number): Promise<Order | null> {
    return this.orderRepository.getOrder(id);
  }
}
