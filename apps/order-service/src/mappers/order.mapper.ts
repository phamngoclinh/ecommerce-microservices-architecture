import { OrderEntity } from '@libs/database/entities/order.entity';
import { Order } from '../models/order.model';
import { OrderItemEntity } from '@libs/database/entities/order-item.entity';
import { ProductEntity } from '@libs/database/entities/product.entity';
import { OrderItem } from '../models/order-item.model';
import { CreateOrderDto } from '../dtos/create-order.dto';
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
      e.product = { id: i.productId } as ProductEntity;
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
      order.orderItems.map(item => new OrderItem(item.id, order.id, item.unitPrice, item.quantity)),
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
