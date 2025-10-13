import { Order } from '@order/domain/models/order.model';
import { OrderResponse } from '../presenters/order-response';
import { OrderItemPresenterMapper } from './order-item-presenter.mapper';

export class OrderPresenterMapper {
  static fromOrder(order: Order): OrderResponse {
    return {
      id: order.id as number,
      orderItems: order.orderItems.map(item => OrderItemPresenterMapper.fromOrderItem(item)),
      status: order.status,
      subAmount: order.subAmount,
      discount: order.discount,
      amount: order.amount,
      vat: order.vat,
      totalAmount: order.vat,
      createdDate: order.createdDate,
    };
  }
}
