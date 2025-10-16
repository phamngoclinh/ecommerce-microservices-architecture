import { IUsecase } from '@libs/common/application/use-cases/base.usecase';
import { OrderStatus } from '@order/domain/models/order.model';
import { IOrderRepository } from '@order/domain/repositories/order.repository';

export class ShipOrderUseCase extends IUsecase<number, { success: boolean }> {
  constructor(private readonly ordersRepository: IOrderRepository) {
    super();
  }

  async execute(id: number): Promise<{ success: boolean }> {
    await this.ordersRepository.updateStatus(id, OrderStatus.SHIPPED);
    return { success: true };
  }
}
