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

  stockIn(qty: number) {
    // Nhập hàng
    if (qty <= 0) throw new Error('Stock-in quantity must be positive');
    this.onHandQty += qty;
    this.availableQty += qty;
  }

  cancelReservation(reservedQty: number) {
    // Giải phóng hàng
    this.reservedQty -= reservedQty;
    this.availableQty = this.onHandQty - this.reservedQty;
  }
}
