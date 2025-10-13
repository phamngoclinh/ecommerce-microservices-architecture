import { Module } from '@nestjs/common';
import { InventoryController } from '../../presentation/controllers/inventory.controller';
import { PersistencyModule } from '../persistency/persistency.module';
import { CheckStockUseCase } from '@inventory/application/use-cases/stocks/check-stock.usecase';
import { ReserveStockUseCase } from '@inventory/application/use-cases/stocks/reserve-stock.usercase';
import { ConfirmReservationUseCase } from '@inventory/application/use-cases/stocks/confirm-reservation.usecase';
import { ReleaseReservationUseCase } from '@inventory/application/use-cases/stocks/release-reservation.usecase';
import { CancelReservationUseCase } from '@inventory/application/use-cases/stocks/cancel-reservation.usecase';

@Module({
  imports: [PersistencyModule],
  controllers: [InventoryController],
  providers: [
    CheckStockUseCase,
    ReserveStockUseCase,
    ConfirmReservationUseCase,
    ReleaseReservationUseCase,
    CancelReservationUseCase,
  ],
})
export class InventoryModule {}
