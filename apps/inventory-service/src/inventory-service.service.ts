import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@libs/database';
import type { CreateStockDto } from './dtos/create-stock.dto';
import type { InventoryDto } from './dtos/inventory.dto';
import type { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import type { CreateSupplierDto } from './dtos/create-supplier.dto';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { ProductDto } from './dtos/product.dto';
import type { SupplierDto } from './dtos/supplier.dto';
import type { WarehouseDto } from './dtos/warehouse.dto';

@Injectable()
export class InventoryServiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  createWarehouse(data: CreateWarehouseDto): Promise<WarehouseDto> {
    return this.databaseService.createWarehouse(data);
  }

  getWarehouses(): Promise<WarehouseDto[] | null> {
    return this.databaseService.getWarehouses();
  }

  getWarehouse(id: number): Promise<WarehouseDto | null> {
    return this.databaseService.getWarehouse(id);
  }

  createSupplier(data: CreateSupplierDto): Promise<SupplierDto> {
    return this.databaseService.createSupplier(data);
  }

  createProduct(data: CreateProductDto): Promise<ProductDto> {
    return this.databaseService.createProduct(data);
  }

  getProducts(): Promise<ProductDto[] | null> {
    return this.databaseService.getProducts();
  }

  getProduct(id: number): Promise<ProductDto | null> {
    return this.databaseService.getProduct(id);
  }

  async stockIn(data: CreateStockDto): Promise<InventoryDto> {
    const product = await this.databaseService.getProduct(data.productId);

    if (product === null) throw Error('Failed to receive into inventory');

    const inventory = {
      quantity: data.quantity,
      product,
    };

    if (data.supplierId) {
      const supplier = await this.databaseService.getSupplier(data.supplierId);
      inventory['supplier'] = supplier;
    }

    if (data.warehouseId) {
      const warehouse = await this.databaseService.getWarehouse(data.warehouseId);
      inventory['warehouse'] = warehouse;
    }

    return this.databaseService.receiveIntoInventory(inventory);
  }

  checkStock(productId: number): Promise<InventoryDto | null> {
    return this.databaseService.checkStockIn(productId);
  }
}
