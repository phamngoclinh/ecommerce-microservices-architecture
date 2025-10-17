import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from '@payment/domain/entities/payment.entity';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentPersistencyMapper } from '../mappers/payment-persistency.mapper';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,
  ) {}

  async create(payment: Payment): Promise<Payment> {
    const paymentEntity = PaymentPersistencyMapper.toEntity(payment);
    const savedEntity = await this.repo.save(paymentEntity);
    const entity = await this.findById(savedEntity.id);
    if (!entity) throw new Error('Payment not found after save');
    return entity;
  }

  async findById(id: number): Promise<Payment | null> {
    const payment = await this.repo.findOne({
      where: { id },
      relations: ['method', 'transactions'],
    });
    if (!payment) return null;
    return PaymentPersistencyMapper.toDomain(payment);
  }

  async updateStatus(id: number, status: PaymentStatus): Promise<Payment> {
    await this.repo.update(id, { status });
    const payment = await this.findById(id);
    if (!payment) throw new Error('Payment not found after update');
    return payment;
  }

  async updateTransactionId(id: number, transactionId: string): Promise<Payment> {
    await this.repo.update(id, { transactionId });
    const payment = await this.findById(id);
    if (!payment) throw new Error('Payment not found after update');
    return payment;
  }

  async getPaymentIdOrderId(orderId: number): Promise<Payment | null> {
    const payment = await this.repo.findOne({
      where: { orderId },
      relations: ['method', 'transactions'],
    });
    if (!payment) return null;
    return PaymentPersistencyMapper.toDomain(payment);
  }
}
