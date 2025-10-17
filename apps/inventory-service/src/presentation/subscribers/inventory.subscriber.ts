import { CreateInventoryItemUseCase } from '@inventory/application/use-cases/inventory-items/create-inventory-item.usecase';
import { CancelReservationUseCase } from '@inventory/application/use-cases/stocks/cancel-reservation.usecase';
import { ConfirmReservationUseCase } from '@inventory/application/use-cases/stocks/confirm-reservation.usecase';
import { ReleaseReservationUseCase } from '@inventory/application/use-cases/stocks/release-reservation.usecase';
import { ReserveStockUseCase } from '@inventory/application/use-cases/stocks/reserve-stock.usercase';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { CancelOrderEvent } from './events/cancel-order.event';
import type { CompleteOrderEvent } from './events/complete-order.event';
import type { ConfirmOrderEvent } from './events/confirm-order.event';
import type { CreateOrderEvent } from './events/create-order.event';
import type { CreateProductEvent } from './events/create-product.event';

@Controller()
export class InventorySubscriber {
  constructor(
    private readonly createInventoryItemUseCase: CreateInventoryItemUseCase,
    private readonly reserveStockUseCase: ReserveStockUseCase,
    private readonly confirmReservationUseCase: ConfirmReservationUseCase,
    private readonly releaseReservationUseCase: ReleaseReservationUseCase,
    private readonly cancelReservationUseCase: CancelReservationUseCase,
  ) {}

  @EventPattern('product.created')
  async handleProductCreated(@Payload() data: CreateProductEvent) {
    console.log('📩 Received product.created event:', data);
    await this.createInventoryItemUseCase.execute({ items: data.map(i => ({ productId: i.id })) });
  }

  @EventPattern('order.created')
  async handleOrderCreated(@Payload() data: CreateOrderEvent) {
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
  async handleOrderConfirmed(@Payload() data: ConfirmOrderEvent) {
    console.log('📩 Received order.confirmed event:', data);
    await this.confirmReservationUseCase.execute({
      orderId: data.id,
    });
  }

  @EventPattern('order.completed')
  async handleOrderCompleted(@Payload() data: CompleteOrderEvent) {
    console.log('📩 Received order.completed event:', data);
    await this.releaseReservationUseCase.execute({
      orderId: data.id,
    });
  }

  @EventPattern('order.cancelled')
  async handleOrderCancelled(@Payload() data: CancelOrderEvent) {
    console.log('📩 Received order.cancelled event:', data);
    await this.cancelReservationUseCase.execute({
      orderId: data.id,
    });
  }
}
