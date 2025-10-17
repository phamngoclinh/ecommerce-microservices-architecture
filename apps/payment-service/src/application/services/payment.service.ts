import { IEventPublisher } from '@libs/common/application/ports/event-publisher';
import { PaymentMethod, PaymentProvider } from '@payment/domain/entities/payment-method.entity';
import {
  PaymentTransaction,
  TransactionType,
} from '@payment/domain/entities/payment-transaction.entity';
import { Payment, PaymentStatus } from '@payment/domain/entities/payment.entity';
import { IPaymentMethodRepository } from '@payment/domain/repositories/payment-method.repository.interface';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { IPaymentGateway } from '../ports/payment-gateway.interface';
import { CreatePaymentMethodsUseCase } from '../usecases/create-payment-method.usecase';
import { CreatePaymentTransactionUseCase } from '../usecases/create-payment-transaction.usecase';
import { CreatePaymentInput, CreatePaymentUseCase } from '../usecases/create-payment.usecase';
import { GetPaymentMethodsUseCase } from '../usecases/get-payment-methods.usecase';
import { GetPaymentTransactionsUseCase } from '../usecases/get-payment-transactions.usecase';
import {
  HandleVendorCallbackInput,
  HandleVendorCallbackUseCase,
} from '../usecases/handle-vendor-callback.usecase';
import {
  UpdatePaymentStatusInput,
  UpdatePaymentStatusUseCase,
} from '../usecases/update-payment-status.usecase';

export class PaymentService {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly updatePaymentStatusUseCase: UpdatePaymentStatusUseCase,
    private readonly createPaymentMethodsUseCase: CreatePaymentMethodsUseCase,
    private readonly getPaymentMethodsUseCase: GetPaymentMethodsUseCase,
    private readonly createPaymentTransactionUseCase: CreatePaymentTransactionUseCase,
    private readonly getPaymentTransactionsUseCase: GetPaymentTransactionsUseCase,
    private readonly handleVendorCallbackUseCase: HandleVendorCallbackUseCase,
    private readonly paymentsRepository: IPaymentRepository,
    private readonly paymentMethodsRepository: IPaymentMethodRepository,
    private readonly paymentGateway: IPaymentGateway,
    private readonly eventPublisher: IEventPublisher,
  ) {}

  //#region startPayment
  async startPayment({
    orderId,
    amount,
    method,
  }: {
    orderId: number;
    amount: number;
    method: PaymentProvider;
  }) {
    const methods = await this.getPaymentMethodsUseCase.execute();
    const pm = methods.find(m => m.provider === method);
    if (!pm) {
      throw new Error(`Payment method with provider ${method} not found`);
    }

    let payment = await this.paymentsRepository.getPaymentIdOrderId(orderId);
    if (!payment) {
      payment = await this.createPaymentUseCase.execute({
        orderId,
        amount,
        methodId: pm.id as number,
      });
    }

    // Store transaction: request to payment gateway
    console.log(
      'Starting payment process for orderId:',
      orderId,
      'with amount:',
      amount,
      'and method:',
      method,
    );
    const data = new PaymentTransaction({
      payment: { id: payment.id as number } as Payment,
      type: TransactionType.REQUEST,
      payload: payment,
    });
    await this.createPaymentTransactionUseCase.execute(data);

    // Get payment URL from payment gateway
    const paymentUrl = await this.paymentGateway.getPaymentUrl(
      payment.orderId,
      payment.amount,
      payment.method.provider,
    );

    // Store transaction: response from payment gateway
    await this.createPaymentTransactionUseCase.execute(
      new PaymentTransaction({
        payment: { id: payment.id as number } as Payment,
        type: TransactionType.RESPONSE,
        payload: payment,
        message: `Generated payment URL: ${paymentUrl}`,
      }),
    );

    return {
      paymentUrl,
    };
  }
  //#endregion startPayment

  async createPaymentMethod(paymentMethod: PaymentMethod) {
    return await this.createPaymentMethodsUseCase.execute(paymentMethod);
  }

  async getPaymentMethods() {
    return await this.getPaymentMethodsUseCase.execute();
  }

  async createPayment(dto: CreatePaymentInput) {
    const methods = await this.paymentMethodsRepository.getAll();
    const method = methods.find(m => m.id === dto.methodId);
    if (!method) {
      throw new Error(`Payment method with id ${dto.methodId} not found`);
    }

    return await this.createPaymentUseCase.execute({
      ...dto,
      methodId: method.id as number,
    });
  }

  async updateStatus(dto: UpdatePaymentStatusInput) {
    const payment = await this.updatePaymentStatusUseCase.execute(dto);

    if (payment.status === PaymentStatus.SUCCESS) {
      await this.eventPublisher.publish('payment.completed', {
        paymentId: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        method: payment.method.displayName,
        timestamp: new Date().toISOString(),
      });
      console.log('[PaymentService] Published event: payment.completed');
    }

    return payment;
  }

  async createPaymentTransaction(dto: PaymentTransaction) {
    return await this.createPaymentTransactionUseCase.execute(dto);
  }

  async getPaymentTransactions(paymentId: number) {
    return await this.getPaymentTransactionsUseCase.execute(paymentId);
  }

  async handleVendorCallback(data: HandleVendorCallbackInput) {
    await this.handleVendorCallbackUseCase.execute(data);
  }
}
