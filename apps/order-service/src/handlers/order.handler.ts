import { Order } from '../models/order.model';

export interface OrderContext {
  order: Order;
  paymentMethod: string;
}

export abstract class OrderHandler {
  protected nextHandler?: OrderHandler;

  setNext(next: OrderHandler): OrderHandler {
    this.nextHandler = next;
    return next;
  }

  async handle(context: OrderContext): Promise<void> {
    if (this.nextHandler) {
      await this.nextHandler.handle(context);
    }
  }
}
