import { CancelReservationUseCase } from '@inventory/application/use-cases/stocks/cancel-reservation.usecase';
import { CheckStockUseCase } from '@inventory/application/use-cases/stocks/check-stock.usecase';
import { ConfirmReservationUseCase } from '@inventory/application/use-cases/stocks/confirm-reservation.usecase';
import { ReleaseReservationUseCase } from '@inventory/application/use-cases/stocks/release-reservation.usecase';
import { ReserveStockUseCase } from '@inventory/application/use-cases/stocks/reserve-stock.usercase';
import { Body, Controller, Param, Post } from '@nestjs/common';
import type { CheckStockDto } from '../dtos/check-order-stock.dto';
import type { ReserveStockDto } from '../dtos/reserve-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly checkStock: CheckStockUseCase,
    private readonly reserveStock: ReserveStockUseCase,
    private readonly confirmReservation: ConfirmReservationUseCase,
    private readonly releaseReservation: ReleaseReservationUseCase,
    private readonly cancelReservation: CancelReservationUseCase,
  ) {}

  @Post('check-stock')
  check(@Body() data: CheckStockDto) {
    return this.checkStock.execute(data);
  }

  @Post('reserve')
  async reserve(@Body() body: ReserveStockDto) {
    return await this.reserveStock.execute(body);
  }

  @Post(':orderId/confirm')
  async confirm(@Param('orderId') orderId: number) {
    return await this.confirmReservation.execute({ orderId });
  }

  @Post(':orderId/release')
  async release(@Param('orderId') orderId: number) {
    return await this.releaseReservation.execute({ orderId });
  }

  @Post(':orderId/cancel')
  async cancel(@Param('orderId') orderId: number) {
    return await this.cancelReservation.execute({ orderId });
  }
}
