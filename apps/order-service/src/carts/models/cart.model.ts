export class Cart {
  productId: number;
  unitPrice: number;
  quantity: number;
  lineAmount: number;

  constructor(
    public readonly id: number | null, // optional technical id
    productId: number,
    unitPrice: number,
    quantity: number,
  ) {
    this.productId = productId;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
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
    };
  }
}

export class CartRead {
  constructor(
    public readonly id: number,
    public readonly productId: number,
    public readonly unitPrice: number,
    public readonly quantity: number,
    public readonly productName: string,
  ) {}
}
