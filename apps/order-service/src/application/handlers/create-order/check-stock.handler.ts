import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';
import { CreateOrderContext, CreateOrderHandler } from './create-order.handler';

export class CheckStockHandler extends CreateOrderHandler {
  constructor(private readonly inventoryGateway: IInventoryGateway) {
    super();
  }

  async handle(context: CreateOrderContext): Promise<void> {
    console.log('Checking stock');
    const stocks = await this.inventoryGateway.checkStock({
      items: context.order.orderItems.map(orderItem => ({
        inventoryItemId: orderItem.inventoryItemId,
        quantity: orderItem.quantity,
      })),
    });

    if (!stocks.isEnough) throw Error('Order items was exceed the stock quantity');
    console.log('✅ Checking stock is done !!!');

    await super.handle(context);
  }
}
