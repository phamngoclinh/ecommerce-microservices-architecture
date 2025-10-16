import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { Order } from '@order/domain/models/order.model';

export interface CompleteOrderContext {
  id: number;

  result?: Order; // intermediate value
  errors?: string[]; // intermediate value
  metadata?: unknown; // intermediate value
}

export class CompleteOrderHandler extends CoRHandler<CompleteOrderContext> {}
