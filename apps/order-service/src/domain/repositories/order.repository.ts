import { Order, OrderStatus } from '../models/order.model';

export abstract class IOrderRepository {
  abstract createOrder(order: Order): Promise<Order>;

  abstract getOrders(): Promise<Order[] | null>;

  abstract getOrder(id: number): Promise<Order | null>;

  abstract updateStatus(id: number, status: OrderStatus): Promise<void>;

  abstract saveOrder(order: Order): Promise<Order>;
}
