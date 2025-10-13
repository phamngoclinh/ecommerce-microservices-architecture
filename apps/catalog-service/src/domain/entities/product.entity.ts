export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
}

export class Product {
  constructor(
    // optional technical id
    public readonly id: number | null,

    // main biz
    public name: string,
    public status: ProductStatus = ProductStatus.ACTIVE,
    public readonly price: number, // gia tham khao. can lay tu pricing service
  ) {}

  snapshot() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      price: this.price,
    };
  }
}
