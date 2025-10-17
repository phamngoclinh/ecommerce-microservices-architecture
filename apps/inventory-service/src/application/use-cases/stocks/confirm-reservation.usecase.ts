import { StockReservationStatus } from '@inventory/domain/entities/stock-reservation.entity';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface ConfirmReservationInput {
  orderId: number;
}

export class ConfirmReservationUseCase extends IUsecase<
  ConfirmReservationInput,
  { success: boolean }
> {
  constructor(
    private readonly stocksRepository: IStockRepository,
    private readonly stockReservationsRepository: IStockReservationRepository,
  ) {
    super();
  }

  async execute({ orderId }: ConfirmReservationInput): Promise<{ success: boolean }> {
    const reservations =
      await this.stockReservationsRepository.getStockReservationsByOrderId(orderId);
    if (!reservations.length) throw new Error('No reservations found for order');

    for (const res of reservations) {
      const stock = await this.stocksRepository.getStockByInventoryItemId(
        res.inventoryItem.id as number,
      );
      if (!stock) continue;

      // confirm stock: giảm availableQty
      stock.availableQty -= res.reservedQty;
      await this.stocksRepository.saveStock(stock);

      res.status = StockReservationStatus.CONFIRMED;
      await this.stockReservationsRepository.saveStockReservation(res);
    }

    return { success: true };
  }
}
