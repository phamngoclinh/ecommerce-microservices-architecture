export class Cart {
  lineAmount: number;

  constructor(
    // optional technical id
    public readonly id: number | null,

    // main biz
    public productId: number,
    public unitPrice: number,
    public quantity: number,

    // for snapshot datas from other system
    public productName: string,
  ) {
    this.lineAmount = this.quantity * this.unitPrice;
  }

  addQty(quantity: number) {
    this.quantity = this.quantity + quantity;
    this.calculateTotals();
  }

  removeQty(quantity: number) {
    if (quantity >= this.quantity) throw Error('Failed to remove quantity');
    this.quantity = this.quantity - quantity;
    this.calculateTotals();
  }

  changeQuantity(quantity: number) {
    if (quantity <= 0) throw Error('Quantity muse be larger than zero');
    this.quantity = quantity;
    this.calculateTotals();
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
      productName: this.productName,
    };
  }
}
