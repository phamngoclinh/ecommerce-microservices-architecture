import { Injectable } from '@nestjs/common';
import { OrderContext, OrderHandler } from './handlers/order.handler';
import { OrderRepository } from './repositories/order.repository';
import { ValidationHandler } from './handlers/validation.handler';
import { SaveOrderHandler } from './handlers/save-order.handler';
import { ConfirmationHandler } from './handlers/confirmation.handler';
import { Order } from './models/order.model';

@Injectable()
export class OrderServiceService {
  private chain: OrderHandler;

  constructor(private readonly orderRepository: OrderRepository) {
    const validation = new ValidationHandler();
    const saveOrder = new SaveOrderHandler(this.orderRepository);
    const confirmation = new ConfirmationHandler(this.orderRepository);
    validation.setNext(saveOrder).setNext(confirmation);
    this.chain = validation;
  }

  async createOrder(data: Order, paymentMethod: string): Promise<Order> {
    const context: OrderContext = { order: data, paymentMethod };
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
