import { CreateInventoryItemUseCase } from '@inventory/application/use-cases/inventory-items/create-inventory-item.usecase';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { CreatedProductEvent } from '../events/created-product.event';

@Controller()
export class InventorySubscriberController {
  constructor(private readonly createInventoryItemUseCase: CreateInventoryItemUseCase) {}

  @EventPattern('product.created')
  async handleProductCreated(@Payload() data: CreatedProductEvent) {
    console.log('📩 Received product.created event:', data);
    await this.createInventoryItemUseCase.execute({ items: data.map(i => ({ productId: i.id })) });
  }
}
