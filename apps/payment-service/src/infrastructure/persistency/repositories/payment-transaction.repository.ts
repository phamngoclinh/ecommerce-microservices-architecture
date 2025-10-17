import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTransaction } from '@payment/domain/entities/payment-transaction.entity';
import { IPaymentTransactionRepository } from '@payment/domain/repositories/payment-transaction.repository.interface';
import { Repository } from 'typeorm';
import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentTransactionPersistencyMapper } from '../mappers/payment-transaction-persistency.mapper';

@Injectable()
export class PaymentTransactionRepository implements IPaymentTransactionRepository {
  constructor(
    @InjectRepository(PaymentTransactionEntity)
    private readonly repo: Repository<PaymentTransactionEntity>,
  ) {}

  async create(paymentTransaction: PaymentTransaction): Promise<PaymentTransaction> {
    const paymentTransactionEntity =
      PaymentTransactionPersistencyMapper.toEntity(paymentTransaction);
    const savedEntity = await this.repo.save(paymentTransactionEntity);
    return PaymentTransactionPersistencyMapper.toDomain(savedEntity);
  }

  async getAllByPaymentId(paymentId: number): Promise<PaymentTransaction[]> {
    const paymentTransactions = await this.repo.find({ where: { payment: { id: paymentId } } });
    return paymentTransactions.map(paymentTransaction =>
      PaymentTransactionPersistencyMapper.toDomain(paymentTransaction),
    );
  }

  async updateExternalId(id: number, externalId: string): Promise<PaymentTransaction> {
    await this.repo.update(id, { externalTxnId: externalId });
    const paymentTransaction = await this.repo.findOneBy({ id });
    if (!paymentTransaction) throw new Error('Payment not found after update');
    return PaymentTransactionPersistencyMapper.toDomain(paymentTransaction);
  }
}
