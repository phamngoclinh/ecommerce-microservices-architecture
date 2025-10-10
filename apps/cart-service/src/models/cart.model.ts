interface Product {
  id: number;
  name: string;
}

export class Cart {
  lineAmount: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  product: Product;

  constructor(
    private readonly id: number | null, // optional technical id
    productId: number,
    unitPrice: number,
    quantity: number,
    product: Product,
  ) {
    this.productId = productId;
    this.productName = product.name;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.lineAmount = this.quantity * this.unitPrice;
    this.product = {
      id: product.id,
      name: product.name,
    };
  }

  getId() {
    return this.id;
  }

  addMoreItem(quantity: number) {
    this.quantity = this.quantity + quantity;
    this.calculateTotals();
  }

  calculateTotals() {
    this.lineAmount = this.quantity * this.unitPrice;
  }

  snapshot() {
    return {
      id: this.id,
      productId: this.productId,
      productName: this.productName,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      lineAmount: this.lineAmount,
      product: {
        id: this.product.id,
        name: this.product.name,
      },
    };
  }
}
