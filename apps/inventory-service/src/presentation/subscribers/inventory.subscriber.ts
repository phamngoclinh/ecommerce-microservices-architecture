import { CreateInventoryItemUseCase } from '@inventory/application/use-cases/inventory-items/create-inventory-item.usecase';
import { ConfirmReservationUseCase } from '@inventory/application/use-cases/stocks/confirm-reservation.usecase';
import { ReleaseReservationUseCase } from '@inventory/application/use-cases/stocks/release-reservation.usecase';
import { ReserveStockUseCase } from '@inventory/application/use-cases/stocks/reserve-stock.usercase';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { CreatedOrderEvent } from './events/created-order.event';
import type { CreatedProductEvent } from './events/created-product.event';

@Controller()
export class InventorySubscriber {
  constructor(
    private readonly createInventoryItemUseCase: CreateInventoryItemUseCase,
    private readonly reserveStockUseCase: ReserveStockUseCase,
    private readonly confirmReservationUseCase: ConfirmReservationUseCase,
    private readonly releaseReservationUseCase: ReleaseReservationUseCase,
  ) {}

  @EventPattern('product.created')
  async handleProductCreated(@Payload() data: CreatedProductEvent) {
    console.log('📩 Received product.created event:', data);
    await this.createInventoryItemUseCase.execute({ items: data.map(i => ({ productId: i.id })) });
  }

  @EventPattern('order.created')
  async handleOrderCreated(@Payload() data: CreatedOrderEvent) {
    console.log('📩 Received order.created event:', data);
    await this.reserveStockUseCase.execute({
      orderId: data.id,
      items: data.orderItems.map(orderItem => ({
        inventoryItemId: orderItem.inventoryItemId,
        quantity: orderItem.quantity,
      })),
    });
  }

  @EventPattern('order.confirmed')
  async handleOrderConfirmed(@Payload() data: { id: number }) {
    console.log('📩 Received order.confirmed event:', data);
    await this.confirmReservationUseCase.execute({
      orderId: data.id,
    });
  }

  @EventPattern('order.completed')
  async handleOrderCompleted(@Payload() data: { id: number }) {
    console.log('📩 Received order.completed event:', data);
    await this.releaseReservationUseCase.execute({
      orderId: data.id,
    });
  }
}
