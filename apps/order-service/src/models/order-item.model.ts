export class OrderItem {
  lineAmount: number;
  productId: number;
  unitPrice: number;
  quantity: number;

  constructor(
    private readonly id: number | null, // optional technical id
    productId: number,
    unitPrice: number,
    quantity: number,
  ) {
    this.productId = productId;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.lineAmount = this.quantity * this.unitPrice;
  }

  getId() {
    return this.id;
  }

  calculateTotals() {
    this.lineAmount = this.quantity * this.unitPrice;
  }

  snapshot() {
    return {
      id: this.id,
      productId: this.productId,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      lineAmount: this.lineAmount,
    };
  }
}
