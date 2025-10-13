import { InventoryItem } from '@inventory/domain/entities/inventory-item.entity';
import { StockReservation } from '@inventory/domain/entities/stock-reservation.entity';
import { IStockReservationRepository } from '@inventory/domain/repositories/stock-reservation.repository';
import { IStockRepository } from '@inventory/domain/repositories/stock.repository';
import { IUsecase } from '@libs/common/application/use-cases/base.usecase';

interface ReserveStockInput {
  orderId: number;
  items: { inventoryItemId: number; quantity: number }[];
}

export class ReserveStockUseCase extends IUsecase<ReserveStockInput, { success: boolean }> {
  constructor(
    private readonly stocksRepository: IStockRepository,
    private readonly stockReservationsRepository: IStockReservationRepository,
  ) {
    super();
  }

  async execute({ items, orderId }: ReserveStockInput): Promise<{ success: boolean }> {
    for (const item of items) {
      const stock = await this.stocksRepository.getStock(item.inventoryItemId);
      if (!stock) throw new Error(`Stock not found for item ${item.inventoryItemId}`);

      const available = stock.onHandQty - stock.reservedQty;
      if (available < item.quantity)
        throw new Error(`Insufficient stock for ${item.inventoryItemId}`);

      // update reserved quantity
      stock.reservedQty += item.quantity;
      await this.stocksRepository.saveStock(stock);

      // create reservation record
      await this.stockReservationsRepository.saveStockReservation(
        new StockReservation(
          null,
          { id: item.inventoryItemId } as InventoryItem,
          orderId,
          item.quantity,
        ),
      );
    }

    return { success: true };
  }
}
