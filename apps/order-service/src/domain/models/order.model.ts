import { OrderItem } from './order-item.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
}

export class Order {
  orderItems: OrderItem[];
  status: OrderStatus;
  discount: number; // percent
  vat: number; // percent
  subAmount: number;
  amount: number;
  totalAmount: number;
  createdDate: Date;

  constructor(
    public readonly id: number | null, // optional technical id
    orderItems: OrderItem[],
    createdDate: Date,
    status: OrderStatus = OrderStatus.PENDING,
    discount: number = 0,
    vat: number = 0,
  ) {
    this.orderItems = orderItems;
    this.status = status;
    this.discount = discount;
    this.vat = vat;
    this.createdDate = createdDate;

    this.calculateTotals();
  }

  addItem(orderItem: OrderItem) {
    if ([OrderStatus.CONFIRMED, OrderStatus.PAID, OrderStatus.COMPLETED].includes(this.status)) {
      throw new Error('Cannot add items after order is processed');
    }
    this.orderItems.push(orderItem);
    this.calculateTotals();
  }

  paid() {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be paid');
    }
    this.status = OrderStatus.PAID;
  }

  confirm() {
    if (this.status !== OrderStatus.PENDING && this.status !== OrderStatus.PAID) {
      throw new Error('Only pending/paid orders can be confirmed');
    }
    this.status = OrderStatus.CONFIRMED;
  }

  ship() {
    if (this.status !== OrderStatus.CONFIRMED) {
      throw new Error('Only confirmed orders can be shipped');
    }
    this.status = OrderStatus.SHIPPED;
  }

  complete() {
    if (this.status !== OrderStatus.SHIPPED) {
      throw new Error('Only shipped orders can be completed');
    }
    this.status = OrderStatus.COMPLETED;
  }

  calculateSubAmount() {
    if (this.orderItems && this.orderItems.length > 0) {
      // Tổng giá gốc
      this.subAmount = this.orderItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
    } else {
      this.subAmount = 0;
    }
  }

  calculateAmount() {
    // Giảm giá có thể là phần trăm (nếu nhỏ hơn 1) hoặc giá trị tuyệt đối
    let discountValue = this.discount;
    if (this.discount < 1) {
      discountValue = this.subAmount * this.discount; // ví dụ discount = 0.1 → 10%
    }

    this.amount = this.subAmount - discountValue;
  }

  calculateTotalAmount() {
    const vatValue = (this.amount * this.vat) / 100;
    this.totalAmount = this.amount + vatValue;
  }

  calculateTotals() {
    this.calculateSubAmount();
    this.calculateAmount();
    this.calculateTotalAmount();
  }

  snapshot() {
    return {
      id: this.id,
      status: this.status,
      orderItems: this.orderItems.map(i => i.snapshot()),
      discount: this.discount,
      vat: this.vat,
      subAmount: this.subAmount,
      amount: this.amount,
      totalAmount: this.totalAmount,
      createdDate: this.createdDate,
    };
  }
}
