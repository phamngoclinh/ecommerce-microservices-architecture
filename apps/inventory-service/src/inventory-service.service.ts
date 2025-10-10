import { Injectable } from '@nestjs/common';
import type { ProductDto } from './dtos/product.dto';
import type { CreateStockDto } from './dtos/create-stock.dto';
import type { InventoryDto } from './dtos/inventory.dto';
import type { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import type { CreateSupplierDto } from './dtos/create-supplier.dto';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { SupplierDto } from './dtos/supplier.dto';
import type { WarehouseDto } from './dtos/warehouse.dto';
import { InventoryRepository } from './repositories/inventory.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { SupplierRepository } from './repositories/supplier.repository';
import { ProductRepository } from 'apps/inventory-service/src/repositories/product.repository';

@Injectable()
export class InventoryServiceService {
  constructor(
    private readonly inventoriesRepository: InventoryRepository,
    private readonly warehousesRepository: WarehouseRepository,
    private readonly suppliersRepository: SupplierRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  createWarehouse(data: CreateWarehouseDto): Promise<WarehouseDto> {
    return this.warehousesRepository.createWarehouse(data);
  }

  getWarehouses(): Promise<WarehouseDto[] | null> {
    return this.warehousesRepository.getWarehouses();
  }

  getWarehouse(id: number): Promise<WarehouseDto | null> {
    return this.warehousesRepository.getWarehouse(id);
  }

  createSupplier(data: CreateSupplierDto): Promise<SupplierDto> {
    return this.suppliersRepository.createSupplier(data);
  }

  createProduct(data: CreateProductDto): Promise<ProductDto> {
    return this.productsRepository.createProduct(data);
  }

  getProducts(): Promise<ProductDto[] | null> {
    return this.productsRepository.getProducts();
  }

  getProduct(id: number): Promise<ProductDto | null> {
    return this.productsRepository.getProduct(id);
  }

  async stockIn(data: CreateStockDto): Promise<InventoryDto> {
    const product = await this.productsRepository.getProduct(data.productId);

    if (product === null) throw Error('Failed to receive into inventory');

    const inventory = {
      quantity: data.quantity,
      product,
    };

    if (data.supplierId) {
      const supplier = await this.suppliersRepository.getSupplier(data.supplierId);
      inventory['supplier'] = supplier;
    }

    if (data.warehouseId) {
      const warehouse = await this.warehousesRepository.getWarehouse(data.warehouseId);
      inventory['warehouse'] = warehouse;
    }

    return this.inventoriesRepository.receiveIntoInventory(inventory);
  }

  getStock(productId: number): Promise<InventoryDto | null> {
    return this.inventoriesRepository.checkStockIn(productId);
  }
}
