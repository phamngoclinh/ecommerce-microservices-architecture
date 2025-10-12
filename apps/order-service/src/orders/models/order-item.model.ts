export class OrderItem {
  unitPrice: number;
  quantity: number;
  lineAmount: number;

  constructor(
    public readonly id: number | null, // optional technical id
    public readonly productId: number,
    public readonly orderId: number,
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
      productId: this.productId,
      orderId: this.orderId,
      unitPrice: this.unitPrice,
      quantity: this.quantity,
      lineAmount: this.lineAmount,
    };
  }
}
