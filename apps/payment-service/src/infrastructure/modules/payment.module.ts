import { EventPublisherService } from '@libs/common/application/ports/event-publisher';
import { RedisClientModule } from '@libs/common/infrastructure/event-bus/redis/redis-client.module';
import { RedisClientService } from '@libs/common/infrastructure/event-bus/redis/redis-client.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IPaymentGateway } from '@payment/application/ports/payment-gateway.interface';
import { PaymentService } from '@payment/application/services/payment.service';
import { CreatePaymentMethodsUseCase } from '@payment/application/usecases/create-payment-method.usecase';
import { CreatePaymentTransactionUseCase } from '@payment/application/usecases/create-payment-transaction.usecase';
import { CreatePaymentUseCase } from '@payment/application/usecases/create-payment.usecase';
import { GetPaymentMethodsUseCase } from '@payment/application/usecases/get-payment-methods.usecase';
import { GetPaymentTransactionsUseCase } from '@payment/application/usecases/get-payment-transactions.usecase';
import { HandleVendorCallbackUseCase } from '@payment/application/usecases/handle-vendor-callback.usecase';
import { UpdatePaymentStatusUseCase } from '@payment/application/usecases/update-payment-status.usecase';
import { IPaymentMethodRepository } from '@payment/domain/repositories/payment-method.repository.interface';
import { IPaymentTransactionRepository } from '@payment/domain/repositories/payment-transaction.repository.interface';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { PaymentGatewaySimulatorController } from '@payment/presentation/controllers/payment-gateway-simulator.controller';
import { PaymentController } from '@payment/presentation/controllers/payment.controller';
import { PaymentSubscriber } from '@payment/presentation/subscribers/payment.subcriber';
import { PaymentWebhookController } from '@payment/presentation/webhooks/webhook.controller';
import { PaymentGatewayAdapter } from '../adapters/payment-gateway.adapter';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule, RedisClientModule, HttpModule],
  controllers: [
    PaymentGatewaySimulatorController,
    PaymentController,
    PaymentWebhookController,
    PaymentSubscriber,
  ],
  providers: [
    {
      provide: PaymentService,
      useFactory: (
        createUseCase: CreatePaymentUseCase,
        updateStatusUseCase: UpdatePaymentStatusUseCase,
        createPaymentMethodsUseCase: CreatePaymentMethodsUseCase,
        getPaymentMethodsUseCase: GetPaymentMethodsUseCase,
        createPaymentTransactionUseCase: CreatePaymentTransactionUseCase,
        getPaymentTransactionsUseCase: GetPaymentTransactionsUseCase,
        handleVendorCallbackUseCase: HandleVendorCallbackUseCase,
        paymentsRepository: IPaymentRepository,
        paymentMethodsRepository: IPaymentMethodRepository,
        paymentGateway: IPaymentGateway,
        eventPublisherClient: RedisClientService,
      ) =>
        new PaymentService(
          createUseCase,
          updateStatusUseCase,
          createPaymentMethodsUseCase,
          getPaymentMethodsUseCase,
          createPaymentTransactionUseCase,
          getPaymentTransactionsUseCase,
          handleVendorCallbackUseCase,
          paymentsRepository,
          paymentMethodsRepository,
          paymentGateway,
          new EventPublisherService(eventPublisherClient),
        ),
      inject: [
        CreatePaymentUseCase,
        UpdatePaymentStatusUseCase,
        CreatePaymentMethodsUseCase,
        GetPaymentMethodsUseCase,
        CreatePaymentTransactionUseCase,
        GetPaymentTransactionsUseCase,
        HandleVendorCallbackUseCase,
        IPaymentRepository,
        IPaymentMethodRepository,
        'IPaymentGateway',
        RedisClientService,
      ],
    },
    {
      provide: CreatePaymentUseCase,
      useFactory: (repo: IPaymentRepository) => {
        return new CreatePaymentUseCase(repo);
      },
      inject: [IPaymentRepository],
    },
    {
      provide: UpdatePaymentStatusUseCase,
      useFactory: (repo: IPaymentRepository) => {
        return new UpdatePaymentStatusUseCase(repo);
      },
      inject: [IPaymentRepository],
    },
    {
      provide: CreatePaymentMethodsUseCase,
      useFactory: (repo: IPaymentMethodRepository) => {
        return new CreatePaymentMethodsUseCase(repo);
      },
      inject: [IPaymentMethodRepository],
    },
    {
      provide: GetPaymentMethodsUseCase,
      useFactory: (repo: IPaymentMethodRepository) => {
        return new GetPaymentMethodsUseCase(repo);
      },
      inject: [IPaymentMethodRepository],
    },
    {
      provide: CreatePaymentTransactionUseCase,
      useFactory: (repo: IPaymentTransactionRepository) => {
        return new CreatePaymentTransactionUseCase(repo);
      },
      inject: [IPaymentTransactionRepository],
    },
    {
      provide: GetPaymentTransactionsUseCase,
      useFactory: (repo: IPaymentTransactionRepository) => {
        return new GetPaymentTransactionsUseCase(repo);
      },
      inject: [IPaymentTransactionRepository],
    },
    {
      provide: HandleVendorCallbackUseCase,
      useFactory: (
        paymentsRepository: IPaymentRepository,
        paymentTransactionsRepository: IPaymentTransactionRepository,
        eventPublisherClient: RedisClientService,
      ) => {
        return new HandleVendorCallbackUseCase(
          paymentsRepository,
          paymentTransactionsRepository,
          new EventPublisherService(eventPublisherClient),
        );
      },
      inject: [IPaymentRepository, IPaymentTransactionRepository, RedisClientService],
    },

    // adapters
    {
      provide: 'IPaymentGateway',
      useClass: PaymentGatewayAdapter,
    },
  ],
})
export class PaymentModule {}
