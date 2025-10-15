import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InventoryItemEntity } from '../entities/inventory-item.entity';
import { InventoryItemPersistencyMapper } from '../mappers/inventory-item-persistency.mapper';

export class InventoryItemRepository extends IInventoryItemRepository {
  constructor(
    @InjectRepository(InventoryItemEntity)
    private readonly inventoryItemsRepository: Repository<InventoryItemEntity>,
  ) {
    super();
  }

  async saveInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem> {
    const entity = InventoryItemPersistencyMapper.toEntity(inventoryItem);
    await this.inventoryItemsRepository.save(entity);
    const saved = await this.inventoryItemsRepository.findOneBy({ id: entity.id });
    return InventoryItemPersistencyMapper.toDomain(saved as InventoryItemEntity);
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

  async getInventoryItemsByProductId(productId: number): Promise<InventoryItem[]> {
    const entities = await this.inventoryItemsRepository.findBy({ productId });
    return entities.map(entity => InventoryItemPersistencyMapper.toDomain(entity));
  }

  async getInventoryItemsByProductIds(productIds: number[]): Promise<InventoryItem[]> {
    const entities = await this.inventoryItemsRepository.findBy({ productId: In(productIds) });
    return entities.map(entity => InventoryItemPersistencyMapper.toDomain(entity));
  }
}
