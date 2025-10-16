import { AllocateInventoryItemUseCase } from '@inventory/application/use-cases/inventory-items/allocate-inventory.usecase';
import { CreateInventoryItemUseCase } from '@inventory/application/use-cases/inventory-items/create-inventory-item.usecase';
import { CancelReservationUseCase } from '@inventory/application/use-cases/stocks/cancel-reservation.usecase';
import { CheckStockUseCase } from '@inventory/application/use-cases/stocks/check-stock.usecase';
import { ConfirmReservationUseCase } from '@inventory/application/use-cases/stocks/confirm-reservation.usecase';
import { ReleaseReservationUseCase } from '@inventory/application/use-cases/stocks/release-reservation.usecase';
import { ReserveStockUseCase } from '@inventory/application/use-cases/stocks/reserve-stock.usercase';
import { StockInUseCase } from '@inventory/application/use-cases/stocks/stock-in.usecase';
import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { InventorySubscriber } from '@inventory/presentation/subscribers/inventory.subscriber';
import { InventoryController } from '@inventory/presentation/http-controllers/inventory.controller';
import { Module } from '@nestjs/common';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule],
  controllers: [InventoryController, InventorySubscriber],
  providers: [
    {
      provide: CheckStockUseCase,
      useFactory: (stocksRepository: IStockRepository) => {
        return new CheckStockUseCase(stocksRepository);
      },
      inject: [IStockRepository],
    },
    {
      provide: ReserveStockUseCase,
      useFactory: (
        stocksRepository: IStockRepository,
        stockReservationsRepository: IStockReservationRepository,
      ) => {
        return new ReserveStockUseCase(stocksRepository, stockReservationsRepository);
      },
      inject: [IStockRepository, IStockReservationRepository],
    },
    {
      provide: ConfirmReservationUseCase,
      useFactory: (
        stocksRepository: IStockRepository,
        stockReservationsRepository: IStockReservationRepository,
      ) => {
        return new ConfirmReservationUseCase(stocksRepository, stockReservationsRepository);
      },
      inject: [IStockRepository, IStockReservationRepository],
    },
    {
      provide: ReleaseReservationUseCase,
      useFactory: (
        stocksRepository: IStockRepository,
        stockReservationsRepository: IStockReservationRepository,
      ) => {
        return new ReleaseReservationUseCase(stocksRepository, stockReservationsRepository);
      },
      inject: [IStockRepository, IStockReservationRepository],
    },
    {
      provide: CancelReservationUseCase,
      useFactory: (
        stocksRepository: IStockRepository,
        stockReservationsRepository: IStockReservationRepository,
      ) => {
        return new CancelReservationUseCase(stocksRepository, stockReservationsRepository);
      },
      inject: [IStockRepository, IStockReservationRepository],
    },
    {
      provide: StockInUseCase,
      useFactory: (stocksRepository: IStockRepository) => {
        return new StockInUseCase(stocksRepository);
      },
      inject: [IStockRepository],
    },
    {
      provide: CreateInventoryItemUseCase,
      useFactory: (
        inventoryItemRepository: IInventoryItemRepository,
        stocksRepository: IStockRepository,
      ) => {
        return new CreateInventoryItemUseCase(inventoryItemRepository, stocksRepository);
      },
      inject: [IInventoryItemRepository, IStockRepository],
    },
    {
      provide: AllocateInventoryItemUseCase,
      useFactory: (inventoryItemRepository: IInventoryItemRepository) => {
        return new AllocateInventoryItemUseCase(inventoryItemRepository);
      },
      inject: [IInventoryItemRepository],
    },
  ],
  exports: [AllocateInventoryItemUseCase],
})
export class InventoryModule {}
