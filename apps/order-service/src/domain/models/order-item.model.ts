export class OrderItem {
  lineAmount: number;

  constructor(
    // optional technical id
    public readonly id: number | null,

    // main biz
    public readonly orderId: number,
    public inventoryItemId: number,
    public readonly unitPrice: number,
    public readonly quantity: number,

    // snapshot data
    public readonly productId: number,
    public readonly productName: string,
  ) {
    this.calculateTotals();
  }

  calculateTotals() {
    this.lineAmount = this.unitPrice * this.quantity;
  }

  snapshot() {
    return {
      id: this.id,
      orderId: this.orderId,
      inventoryItemId: this.inventoryItemId,
      productId: this.productId,
      productName: this.productName,
      unitPrice: this.unitPrice,
      quantity: this.quantity,
      lineAmount: this.lineAmount,
    };
  }
}
