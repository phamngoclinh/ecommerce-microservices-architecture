import { InventoryEntity } from '@libs/database/entities/inventory.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventorysRepository: Repository<InventoryEntity>,
  ) {}

  async receiveIntoInventory(inventory: DeepPartial<InventoryEntity>): Promise<InventoryEntity> {
    const result = this.inventorysRepository.create(inventory);
    await this.inventorysRepository.save(result);
    return result;
  }

  checkStockIn(productId: number): Promise<InventoryEntity | null> {
    return this.inventorysRepository.findOne({
      where: {
        product: {
          id: productId,
        },
      },
    });
  }
}
