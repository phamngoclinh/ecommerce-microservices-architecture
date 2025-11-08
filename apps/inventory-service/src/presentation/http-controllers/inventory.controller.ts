import { AllocateInventoryItemUseCase } from '@inventory/application/use-cases/inventory-items/allocate-inventory.usecase';
import { GetInventoryItemsUseCase } from '@inventory/application/use-cases/inventory-items/get-inventory-items.usecase';
import { CheckStockUseCase } from '@inventory/application/use-cases/stocks/check-stock.usecase';
import { StockInUseCase } from '@inventory/application/use-cases/stocks/stock-in.usecase';
import { AuthGuard, IgnoreAuth } from '@libs/common/modules/auth/auth.guard';
import { Roles, RolesGuard } from '@libs/common/modules/auth/roles.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import type { AllocateItemDto } from './dtos/allocate-item.dto';
import type { CheckStockDto } from './dtos/check-stock.dto';
import type { StockInDto } from './dtos/stock-in.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly checkStockUseCase: CheckStockUseCase,
    private readonly stockInUseCase: StockInUseCase,
    private readonly allocateInventoryItemUseCase: AllocateInventoryItemUseCase,
    private readonly getInventoryItemsUseCase: GetInventoryItemsUseCase,
  ) {}

  @Post('allocate-item')
  async allocateItem(@Body() body: AllocateItemDto) {
    return await this.allocateInventoryItemUseCase.execute(body);
  }

  @Roles('admin')
  @Post('stock-in')
  stockIn(@Body() data: StockInDto) {
    return this.stockInUseCase.execute(data);
  }

  @IgnoreAuth()
  @Post('check-product-stock')
  async checkProductStock(@Body() data: { items: { productId: number; quantity: number }[] }) {
    const allocates = await this.allocateInventoryItemUseCase.execute(data);

    const check = data.items.map(item => {
      const inventoryId = allocates.find(x => (x.productId = item.productId));
      return {
        inventoryItemId: inventoryId?.inventoryItemId || 0,
        quantity: 1,
      };
    });
    return this.checkStockUseCase.execute({ items: check });
  }

  @Roles('admin')
  @Post('get-items')
  getItems() {
    return this.getInventoryItemsUseCase.execute();
  }

  @IgnoreAuth()
  @Post('check-stock')
  check(@Body() data: CheckStockDto) {
    return this.checkStockUseCase.execute(data);
  }
}
