import { BaseHandler } from '@libs/common/handlers/base.handler';
import { Order } from '@order/domain/models/order.model';

export interface OrderCreationContext {
  order: Order;
  paymentMethod: string;
}

export class OrderCreationHandler extends BaseHandler<OrderCreationContext> {}
