import { Stock } from '@inventory/domain/entities/stock.entity';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { StockEntity } from '../entities/stock.entity';
import { StockPersistencyMapper } from '../mappers/stock-persistency.mapper';

@Injectable()
export class StockRepository extends IStockRepository {
  constructor(
    @InjectRepository(StockEntity)
    private stocksRepository: Repository<StockEntity>,
  ) {
    super();
  }

  async saveStock(stock: Stock): Promise<Stock> {
    const entity = StockPersistencyMapper.toEntity(stock);
    await this.stocksRepository.save(entity);
    return StockPersistencyMapper.toDomain(entity);
  }

  async getStock(id: number): Promise<Stock | null> {
    const entity = await this.stocksRepository.findOneBy({ id });
    if (entity === null) return null;
    return StockPersistencyMapper.toDomain(entity);
  }

  async getStockByInventoryItemId(inventoryItemId: number): Promise<Stock | null> {
    const entity = await this.stocksRepository.findOneBy({
      inventoryItem: { id: inventoryItemId },
    });
    if (entity === null) return null;
    return StockPersistencyMapper.toDomain(entity);
  }

  async getStocks(ids: number[]): Promise<Stock[]> {
    const entities = await this.stocksRepository.find({ where: { id: In(ids) } });
    return entities.map(entity => StockPersistencyMapper.toDomain(entity));
  }
}
