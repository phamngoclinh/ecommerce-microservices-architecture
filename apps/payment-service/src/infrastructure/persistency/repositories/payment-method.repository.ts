import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '@payment/domain/entities/payment-method.entity';
import { IPaymentMethodRepository } from '@payment/domain/repositories/payment-method.repository.interface';
import { Repository } from 'typeorm';
import { PaymentMethodEntity } from '../entities/payment-method.entity';
import { PaymentMethodPersistencyMapper } from '../mappers/payment-method-persistency.mapper';

@Injectable()
export class PaymentMethodRepository implements IPaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly repo: Repository<PaymentMethodEntity>,
  ) {}

  async create(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    const paymentMethodEntity = PaymentMethodPersistencyMapper.toEntity(paymentMethod);
    const savedEntity = await this.repo.save(paymentMethodEntity);
    return PaymentMethodPersistencyMapper.toDomain(savedEntity);
  }

  async getAll(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.repo.find();
    return paymentMethods.map(paymentMethod =>
      PaymentMethodPersistencyMapper.toDomain(paymentMethod),
    );
  }
}
