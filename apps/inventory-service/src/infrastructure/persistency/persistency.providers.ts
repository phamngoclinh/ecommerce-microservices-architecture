import { IInventoryItemRepository } from '@inventory/domain/repositories/inventory-item.repository';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { PersistencyProviders } from '@libs/common/infrastructure/persistency/providers/persistency.provider';
import { InventoryItemRepository } from './repositories/inventory-item.repository';
import { StockReservationRepository } from './repositories/stock-reservation.repository';
import { StockRepository } from './repositories/stock.repository';

export const InventoryPersistencyProviders = [
  {
    provide: IInventoryItemRepository,
    useClass: InventoryItemRepository,
  },
  {
    provide: IStockRepository,
    useClass: StockRepository,
  },
  {
    provide: IStockReservationRepository,
    useClass: StockReservationRepository,
  },
  ...PersistencyProviders,
];
