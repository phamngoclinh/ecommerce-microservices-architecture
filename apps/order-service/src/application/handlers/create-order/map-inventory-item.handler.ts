import { CreateOrderContext, CreateOrderHandler } from './create-order.handler';
import type { IInventoryGateway } from '@order/application/ports/inventory.gateway';

export class MapInventoryItemHandler extends CreateOrderHandler {
  constructor(private readonly inventoryGateway: IInventoryGateway) {
    super();
  }

  async handle(context: CreateOrderContext): Promise<void> {
    console.log('Mapping inventoryItemId');
    const productIds = context.order.orderItems.map(orderItem => orderItem.productId);
    const items = await this.inventoryGateway.findBestInventoryItem(productIds);
    console.log('-items', items);

    context.order.orderItems.forEach(orderItem => {
      const item = items.find(x => x.productId === orderItem.productId);
      if (item) orderItem.inventoryItemId = item.inventoryItemId;
    });
    console.log('✅ Mapping inventoryItemId is done !!!');

    await super.handle(context);
  }
}
