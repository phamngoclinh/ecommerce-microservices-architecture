import { StockReservationStatus } from '@inventory/domain/entities/stock-reservation.entity';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface ReleaseReservationInput {
  orderId: number;
}

export class ReleaseReservationUseCase extends IUsecase<
  ReleaseReservationInput,
  { success: boolean }
> {
  constructor(
    private readonly stocksRepository: IStockRepository,
    private readonly stockReservationsRepository: IStockReservationRepository,
  ) {
    super();
  }

  async execute({ orderId }: ReleaseReservationInput): Promise<{ success: boolean }> {
    const reservations =
      await this.stockReservationsRepository.getStockReservationsByOrderId(orderId);

    for (const res of reservations) {
      const stock = await this.stocksRepository.getStockByInventoryItemId(
        res.inventoryItem.id as number,
      );
      if (!stock) continue;

      stock.onHandQty -= res.reservedQty;
      stock.reservedQty -= res.reservedQty;
      await this.stocksRepository.saveStock(stock);

      res.status = StockReservationStatus.RELEASED;
      await this.stockReservationsRepository.saveStockReservation(res);
    }

    return { success: true };
  }
}
