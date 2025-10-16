import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { Order } from '@order/domain/models/order.model';

export interface CreateOrderContext {
  order: Order;
  paymentMethod: string;

  result?: Order; // intermediate value
  errors?: string[]; // intermediate value
  metadata?: unknown; // intermediate value
}

export class CreateOrderHandler extends CoRHandler<CreateOrderContext> {}
