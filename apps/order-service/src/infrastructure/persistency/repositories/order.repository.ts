import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from '@order/domain/models/order.model';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemMapper } from '../mappers/order-item.mapper';
import { OrderMapper } from '../mappers/order.mapper';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async createOrder(order: Order): Promise<Order> {
    const orderEntity = OrderMapper.toEntity(order);
    await this.orderRepository.save(orderEntity);
    await this.orderItemRepository.save(
      // order.orderItems.map(item => ({
      //   order: orderEntity,
      //   product: { id: item.productId },
      //   quantity: item.quantity,
      //   unitPrice: item.unitPrice,
      // })),
      order.orderItems.map(item => OrderItemMapper.toEntity(item)),
    );

    return OrderMapper.toDomain(orderEntity);
  }

  async getOrders(): Promise<Order[] | null> {
    const orderEntity = await this.orderRepository.find({});
    if (orderEntity === null) return null;
    return orderEntity.map(e => OrderMapper.toDomain(e));
  }

  async getOrder(id: number): Promise<Order | null> {
    const orderEntity = await this.orderRepository.findOne({ where: { id } });
    if (orderEntity === null) return null;
    return OrderMapper.toDomain(orderEntity);
  }

  async updateStatus(id: number, status: OrderStatus): Promise<void> {
    await this.orderRepository.update(id, { status });
  }

  async saveOrder(order: Order): Promise<Order> {
    const orderEntity = OrderMapper.toEntity(order);
    await this.orderItemRepository.save(orderEntity);
    return order;
  }
}
