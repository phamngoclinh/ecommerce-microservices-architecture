import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { IValidator } from '@libs/common/validators/validator';
import { GetOrderContext } from '@order/application/validators/get-order.validator';
import { Order } from '@order/domain/models/order.model';

export class GetOrderUseCase extends IUsecase<number, Order> {
  constructor(private readonly getOrderValidator: IValidator<GetOrderContext>) {
    super();
  }

  async execute(input: number): Promise<Order> {
    const context: GetOrderContext = { id: input, order: undefined };
    await this.getOrderValidator.handle(context);
    return context.order as unknown as Order;
  }
}
