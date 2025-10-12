import { BaseHandler } from '@libs/common/handlers/base-handler';
import { Order } from '../../models/order.model';

export interface OrderCreationContext {
  order: Order;
  paymentMethod: string;
}

export abstract class OrderCreationHandler extends BaseHandler<OrderCreationContext> {}
