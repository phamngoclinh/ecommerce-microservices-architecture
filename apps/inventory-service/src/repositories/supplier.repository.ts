import { SupplierEntity } from '@libs/database/entities/supplier.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class SupplierRepository {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
  ) {}

  async createSupplier(supplier: DeepPartial<SupplierEntity>): Promise<SupplierEntity> {
    const result = this.supplierRepository.create(supplier);
    await this.supplierRepository.save(result);
    return result;
  }

  getSuppliers(): Promise<SupplierEntity[] | null> {
    return this.supplierRepository.find();
  }

  getSupplier(supplierId: number): Promise<SupplierEntity | null> {
    return this.supplierRepository.findOne({ where: { id: supplierId } });
  }
}
