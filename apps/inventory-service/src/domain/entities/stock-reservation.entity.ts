import { InventoryItem } from './inventory-item.entity';

export enum StockReservationStatus {
  PENDING = 'PENDING', // Giữ hàng tạm thời khi khách tạo đơn
  CONFIRMED = 'CONFIRMED', // Khi order được xác nhận / thanh toán thành công
  RELEASED = 'RELEASED', // Khi hàng được giao / xuất kho thành công
  CANCELLED = 'CANCELLED', // Khi đơn bị hủy / hết hạn / thanh toán fail
}

export class StockReservation {
  constructor(
    public readonly id: number | null,
    public inventoryItem: InventoryItem,
    public orderId: number,
    public reservedQty: number,
    public status: StockReservationStatus = StockReservationStatus.PENDING,
    public reservedAt: Date = new Date(),
    public expiredAt?: Date,
    public releasedAt?: Date,
  ) {}

  confirmReservation() {
    this.status = StockReservationStatus.CONFIRMED;
  }

  releaseReservation() {
    this.status = StockReservationStatus.RELEASED;
    this.releasedAt = new Date();
  }

  cancelReservation() {
    this.status = StockReservationStatus.CANCELLED;
    this.releasedAt = new Date();
  }
}
