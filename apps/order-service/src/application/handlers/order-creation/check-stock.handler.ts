import { IOrderRepository } from '@order/domain/repositories/order.repository';
import { OrderCreationContext, OrderCreationHandler } from './order-creation.handler';

export class CheckStockHandler extends OrderCreationHandler {
  constructor(private readonly orderRepository: IOrderRepository) {
    super();
  }

  async handle(context: OrderCreationContext): Promise<void> {
    const inventory = [
      { productId: 1, quantity: 100 },
      { productId: 2, quantity: 200 },
      { productId: 3, quantity: 100 },
    ];

    const invalid = context.order.orderItems.some(e => {
      const stock = inventory.find(x => x.productId === e.productId);
      if (!stock) return true;
      return stock.quantity < e.quantity;
    });

    if (invalid) throw Error('Order items was exceed the stock quantity');

    await super.handle(context);
  }
}
