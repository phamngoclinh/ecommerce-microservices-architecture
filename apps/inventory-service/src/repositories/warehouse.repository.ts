import { WarehouseEntity } from '@libs/database/entities/warehouse.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class WarehouseRepository {
  constructor(
    @InjectRepository(WarehouseEntity)
    private warehouseRepository: Repository<WarehouseEntity>,
  ) {}

  async createWarehouse(warehouse: DeepPartial<WarehouseEntity>): Promise<WarehouseEntity> {
    const result = this.warehouseRepository.create(warehouse);
    await this.warehouseRepository.save(result);
    return result;
  }

  getWarehouses(): Promise<WarehouseEntity[] | null> {
    return this.warehouseRepository.find();
  }

  getWarehouse(warehouseId: number): Promise<WarehouseEntity | null> {
    return this.warehouseRepository.findOne({ where: { id: warehouseId } });
  }
}
