import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderItem } from '../models/order-item.model';
import { Order } from '../models/order.model';
import { OrderItemMapper } from './order-item.mapper';

export class OrderMapper {
  static toEntity(order: Order): OrderEntity {
    const snapshot = order.snapshot();
    const orderEntity = new OrderEntity();
    if (snapshot.id) orderEntity.id = snapshot.id;
    orderEntity.status = snapshot.status;
    orderEntity.subAmount = snapshot.subAmount;
    orderEntity.discount = snapshot.discount;
    orderEntity.amount = snapshot.amount;
    orderEntity.vat = snapshot.vat;
    orderEntity.totalAmount = snapshot.totalAmount;
    orderEntity.createdAt = snapshot.createdDate;
    orderEntity.orderItems = snapshot.orderItems.map(i => {
      const e = new OrderItemEntity();
      e.productId = i.productId;
      e.quantity = i.quantity;
      e.unitPrice = i.unitPrice;
      e.lineAmount = i.lineAmount;
      return e;
    });
    return orderEntity;
  }

  static toDomain(order: OrderEntity): Order {
    return new Order(
      order.id,
      order.orderItems.map(
        item =>
          new OrderItem(item.id, item.order.id, item.productId, item.unitPrice, item.quantity),
      ),
      order.status,
      order.discount,
      order.vat,
    );
  }

  static fromCreateOrderDto(dto: CreateOrderDto): Order {
    const orderItems = dto.orderItems.map(item => OrderItemMapper.fromCreateOrderItemDto(item));
    const order = new Order(null, orderItems);
    return order;
  }
}
