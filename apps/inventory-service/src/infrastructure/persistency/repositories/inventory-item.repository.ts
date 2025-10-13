import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { InventoryItemPersistencyMapper } from '../mappers/inventory-item-persistency.mapper';

@Injectable()
export class InventoryItemRepository extends IInventoryItemRepository {
  constructor(
    @InjectRepository(InventoryItemEntity)
    private inventoryItemsRepository: Repository<InventoryItemEntity>,
  ) {
    super();
  }

  async saveInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem> {
    const entity = InventoryItemPersistencyMapper.toEntity(inventoryItem);
    await this.inventoryItemsRepository.save(entity);
    return InventoryItemPersistencyMapper.toDomain(entity);
  }

  async getInventoryItem(id: number): Promise<InventoryItem | null> {
    const entity = await this.inventoryItemsRepository.findOneBy({ id });
    if (entity === null) return null;
    return InventoryItemPersistencyMapper.toDomain(entity);
  }

  async getInventoryItemByProductId(productId: number): Promise<InventoryItem | null> {
    const entity = await this.inventoryItemsRepository.findOneBy({ productId });
    if (entity === null) return null;
    return InventoryItemPersistencyMapper.toDomain(entity);
  }
}
