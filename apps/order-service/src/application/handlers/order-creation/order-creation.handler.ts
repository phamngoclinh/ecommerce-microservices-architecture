import { BaseHandler } from '@libs/common/handlers/base.handler';
import { Order } from '@order/domain/models/order.model';

export interface OrderCreationContext {
  order: Order;
  paymentMethod: string;

  result?: Order; // intermediate value
  errors?: string[]; // intermediate value
  metadata?: unknown; // intermediate value
}

export class OrderCreationHandler extends BaseHandler<OrderCreationContext> {}
