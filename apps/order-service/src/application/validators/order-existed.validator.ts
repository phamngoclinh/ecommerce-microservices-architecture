import { IValidator } from '@libs/common/validators/validator';
import { Order } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';

interface CheckOrderExistedContext {
  id: number;
  order?: Order; // intermediate value - temporary cache
}

export class OrderExistedValidator extends IValidator<CheckOrderExistedContext> {
  constructor(private readonly ordersRepository: IOrderRepository) {
    super();
  }

  async validate(context: CheckOrderExistedContext): Promise<void> {
    const order = await this.ordersRepository.getOrder(context.id);
    if (order === null) throw Error('Order is not found');
    context.order = order;
  }
}
