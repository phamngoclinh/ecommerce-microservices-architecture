import { StockReservation } from './stock-reservation.entity';
import { Stock } from './stock.entity';

export class InventoryItem {
  constructor(
    public readonly id: number | null,
    public productId: number,
    public isActive: boolean,
    public stocks: Stock[],
    public reservations: StockReservation[],
  ) {}
}
