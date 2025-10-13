import { StockReservation } from '@inventory/domain/entities/stock-reservation.entity';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockReservationEntity } from '../entities/stock-reservation.entity';
import { StockReservationPersistencyMapper } from '../mappers/stock-reservation-persistency.mapper';

@Injectable()
export class StockReservationRepository extends IStockReservationRepository {
  constructor(
    @InjectRepository(StockReservationEntity)
    private stockReservationsRepository: Repository<StockReservationEntity>,
  ) {
    super();
  }

  async saveStockReservation(stockReservation: StockReservation): Promise<StockReservation> {
    const entity = StockReservationPersistencyMapper.toEntity(stockReservation);
    await this.stockReservationsRepository.save(entity);
    return StockReservationPersistencyMapper.toDomain(entity);
  }

  async getStockReservation(id: number): Promise<StockReservation | null> {
    const entity = await this.stockReservationsRepository.findOneBy({ id });
    if (entity === null) return null;
    return StockReservationPersistencyMapper.toDomain(entity);
  }

  async getStockReservationByOrderId(orderId: number): Promise<StockReservation | null> {
    const entity = await this.stockReservationsRepository.findOneBy({ orderId });
    if (entity === null) return null;
    return StockReservationPersistencyMapper.toDomain(entity);
  }

  async getStockReservationsByOrderId(orderId: number): Promise<StockReservation[]> {
    const entities = await this.stockReservationsRepository.findBy({ orderId });
    return entities.map(entity => StockReservationPersistencyMapper.toDomain(entity));
  }
}
