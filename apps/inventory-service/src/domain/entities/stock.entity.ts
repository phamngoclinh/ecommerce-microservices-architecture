import { InventoryItem } from './inventory-item.entity';

export class Stock {
  constructor(
    public readonly id: number | null,
    public inventoryItem: InventoryItem,
    // So luong hang thuc te
    public onHandQty: number,
    // So luong hang dang duoc dat
    public reservedQty: number,
    // So luong hang dang kha thi
    public availableQty: number,
  ) {}

  cancelReservation(reservedQty: number) {
    // Giải phóng hàng
    this.reservedQty -= reservedQty;
    this.availableQty = this.onHandQty - this.reservedQty;
  }
}
