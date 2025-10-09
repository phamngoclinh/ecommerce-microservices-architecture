import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InventoryServiceService } from './inventory-service.service';
import type { CreateStockDto } from './dtos/create-stock.dto';
import type { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import type { CreateSupplierDto } from './dtos/create-supplier.dto';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { GetProductDto } from './dtos/get-product.dto';

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
  getProduct(@Body() body: GetProductDto) {
    return this.inventoryServiceService.getProduct(body.id);
  }

  @Post('create-stock')
  stockIn(@Body() createStockDto: CreateStockDto) {
    return this.inventoryServiceService.stockIn(createStockDto);
  }

  @Get('check-stock/:id')
  getStock(@Param('id') id: number): string {
    const result = this.inventoryServiceService.checkStock(id);
    return JSON.stringify(result);
  }
}
