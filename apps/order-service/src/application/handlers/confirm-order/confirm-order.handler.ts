import { CoRHandler } from '@libs/common/patterns/cor.pattern';
import { Order } from '@order/domain/models/order.model';

export interface ConfirmOrderContext {
  id: number;

  result?: Order; // intermediate value
  errors?: string[]; // intermediate value
  metadata?: unknown; // intermediate value
}

export class ConfirmOrderHandler extends CoRHandler<ConfirmOrderContext> {}
