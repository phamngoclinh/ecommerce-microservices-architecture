import { IValidator } from '@libs/common/validators/validator';
import { OrderExistedValidator } from './order-existed.validator';
import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { Order } from '@order/domain/models/order.model';

export interface GetOrderContext {
  id: number;
  order?: Order;
}

export class GetOrderValidator extends IValidator<GetOrderContext> {
  private chain: IValidator<GetOrderContext>;

  constructor(private readonly ordersRepository: IOrderRepository) {
    super();

    const existed = new OrderExistedValidator(this.ordersRepository);
    this.chain = existed;
  }

  protected async validate(context: GetOrderContext): Promise<void> {
    await this.chain.handle(context);
  }
}
