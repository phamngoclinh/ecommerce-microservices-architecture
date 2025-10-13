import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from '@order/domain/models/order.model';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderPersistencyMapper } from '../mappers/order-persistency.mapper';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async createOrder(order: Order): Promise<Order> {
    const orderEntity = OrderPersistencyMapper.toEntity(order);
    await this.orderRepository.save(orderEntity);
    return OrderPersistencyMapper.toDomain(orderEntity);
  }

  async getOrders(): Promise<Order[]> {
    const orderEntity = await this.orderRepository.find({});
    return orderEntity.map(e => OrderPersistencyMapper.toDomain(e));
  }

  async getOrder(id: number): Promise<Order | null> {
    const orderEntity = await this.orderRepository.findOne({ where: { id } });
    if (orderEntity === null) return null;
    return OrderPersistencyMapper.toDomain(orderEntity);
  }

  async updateStatus(id: number, status: OrderStatus): Promise<void> {
    await this.orderRepository.update(id, { status });
  }

  async saveOrder(order: Order): Promise<Order> {
    const orderEntity = OrderPersistencyMapper.toEntity(order);
    await this.orderItemRepository.save(orderEntity);
    return order;
  }
}
