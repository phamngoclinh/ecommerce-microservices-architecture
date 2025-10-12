export class OrderItem {
  unitPrice: number;
  quantity: number;
  lineAmount: number;

  constructor(
    public readonly id: number | null, // optional technical id
    public readonly orderId: number,
    public readonly productId: number,
    unitPrice: number,
    quantity: number,
  ) {
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.lineAmount = this.unitPrice * this.quantity;
  }

  calculateTotals() {
    this.lineAmount = this.unitPrice * this.quantity;
  }

  snapshot() {
    return {
      id: this.id,
      orderId: this.orderId,
      productId: this.productId,
      unitPrice: this.unitPrice,
      quantity: this.quantity,
      lineAmount: this.lineAmount,
    };
  }
}
