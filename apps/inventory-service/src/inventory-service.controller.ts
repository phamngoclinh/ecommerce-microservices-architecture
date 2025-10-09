import { Body, Controller, Post } from '@nestjs/common';
import { InventoryServiceService } from './inventory-service.service';
import type { CreateStockDto } from './dtos/create-stock.dto';
import type { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import type { CreateSupplierDto } from './dtos/create-supplier.dto';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { GetProductDto } from './dtos/get-product.dto';
import type { GetStockDto } from './dtos/get-stock.dto';

@Controller()
export class InventoryServiceController {
  constructor(private readonly inventoryServiceService: InventoryServiceService) {}

  @Post('create-warehouse')
  createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.inventoryServiceService.createWarehouse(createWarehouseDto);
  }

  @Post('get-warehouses')
  getWarehouses() {
    return this.inventoryServiceService.getWarehouses();
  }

  @Post('create-supplier')
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.inventoryServiceService.createSupplier(createSupplierDto);
  }

  @Post('create-product')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.inventoryServiceService.createProduct(createProductDto);
  }

  @Post('get-products')
  getProducts() {
    return this.inventoryServiceService.getProducts();
  }

  @Post('get-product')
  getProduct(@Body() getProductDto: GetProductDto) {
    return this.inventoryServiceService.getProduct(getProductDto.id);
  }

  @Post('create-stock')
  stockIn(@Body() createStockDto: CreateStockDto) {
    return this.inventoryServiceService.stockIn(createStockDto);
  }

  @Post('get-stock')
  getStock(@Body() getStockDto: GetStockDto) {
    const result = this.inventoryServiceService.getStock(getStockDto.productId);
    return result;
  }
}
