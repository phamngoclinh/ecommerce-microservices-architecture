/**
 * Infrastructure Layer - Notification Message Repository Implementation
 * Implements the domain repository interface using TypeORM
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MessageStatus,
  NotificationMessage,
} from '@notification/domain/entities/notification-message';
import { INotificationMessageRepository } from '@notification/domain/repositories/notification-message.repository';
import { Repository } from 'typeorm';
import { NotificationMessageEntity } from '../entities/notification-message.entity';
import { NotificationMessageMapper } from '../mappers/notification-message.mapper';

@Injectable()
export class NotificationMessageRepositoryImpl implements INotificationMessageRepository {
  constructor(
    @InjectRepository(NotificationMessageEntity)
    private readonly typeormRepository: Repository<NotificationMessageEntity>,
  ) {}

  async save(message: NotificationMessage): Promise<NotificationMessage> {
    const entity = NotificationMessageMapper.toPersistence(message);
    const savedEntity = await this.typeormRepository.save(entity);
    return NotificationMessageMapper.toDomain(savedEntity);
  }

  async findById(id: number): Promise<NotificationMessage | null> {
    const entity = await this.typeormRepository.findOne({ where: { id } });
    return entity ? NotificationMessageMapper.toDomain(entity) : null;
  }

  async findByStatus(status: MessageStatus): Promise<NotificationMessage[]> {
    const entities = await this.typeormRepository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
    return entities.map(entity => NotificationMessageMapper.toDomain(entity));
  }

  async findByRecipient(recipient: string): Promise<NotificationMessage[]> {
    const entities = await this.typeormRepository.find({
      where: { recipient },
      order: { createdAt: 'DESC' },
    });
    return entities.map(entity => NotificationMessageMapper.toDomain(entity));
  }

  async findBySentAfter(date: Date): Promise<NotificationMessage[]> {
    const entities = await this.typeormRepository
      .createQueryBuilder('msg')
      .where('msg.sentAt > :date', { date })
      .orderBy('msg.createdAt', 'DESC')
      .getMany();
    return entities.map(entity => NotificationMessageMapper.toDomain(entity));
  }

  async findWithFilters(filters: {
    status?: MessageStatus;
    recipient?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<NotificationMessage[]> {
    const query = this.typeormRepository.createQueryBuilder('msg');

    if (filters.status) {
      query.andWhere('msg.status = :status', { status: filters.status });
    }

    if (filters.recipient) {
      query.andWhere('msg.recipient = :recipient', { recipient: filters.recipient });
    }

    if (filters.startDate) {
      query.andWhere('msg.createdAt >= :startDate', { startDate: filters.startDate });
    }

    if (filters.endDate) {
      query.andWhere('msg.createdAt <= :endDate', { endDate: filters.endDate });
    }

    query.orderBy('msg.createdAt', 'DESC');
    query.limit(filters.limit || 50);

    const entities = await query.getMany();
    return entities.map(entity => NotificationMessageMapper.toDomain(entity));
  }

  async getStats(hours: number): Promise<{
    total: number;
    sent: number;
    failed: number;
    pending: number;
  }> {
    const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);

    const [total, sent, failed, pending] = await Promise.all([
      this.typeormRepository
        .createQueryBuilder()
        .where('createdAt >= :startDate', { startDate })
        .getCount(),
      this.typeormRepository
        .createQueryBuilder()
        .where('createdAt >= :startDate', { startDate })
        .andWhere('status = :status', { status: MessageStatus.SENT })
        .getCount(),
      this.typeormRepository
        .createQueryBuilder()
        .where('createdAt >= :startDate', { startDate })
        .andWhere('status = :status', { status: MessageStatus.FAILED })
        .getCount(),
      this.typeormRepository
        .createQueryBuilder()
        .where('createdAt >= :startDate', { startDate })
        .andWhere('status = :status', { status: MessageStatus.PENDING })
        .getCount(),
    ]);

    return { total, sent, failed, pending };
  }
}
