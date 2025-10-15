import { OrderItem } from '@order/domain/models/order-item.model';
import { Order } from '@order/domain/models/order.model';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';

export class OrderPersistencyMapper {
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
      e.inventoryItemId = i.inventoryItemId;
      e.unitPrice = i.unitPrice;
      e.quantity = i.quantity;
      e.lineAmount = i.lineAmount;
      e.productId = i.productId;
      e.productName = i.productName;
      return e;
    });
    return orderEntity;
  }

  static toDomain(order: OrderEntity): Order {
    return new Order(
      order.id,
      order.orderItems.map(
        item =>
          new OrderItem(
            item.id,
            order.id,
            item.inventoryItemId,
            item.unitPrice,
            item.quantity,
            item.productId,
            item.productName,
          ),
      ),
      order.createdAt,
      order.status,
      order.discount,
      order.vat,
    );
  }
}
