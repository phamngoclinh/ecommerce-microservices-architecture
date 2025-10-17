import { EventPublisherService } from '@libs/common/application/ports/event-publisher';
import { RedisClientModule } from '@libs/common/infrastructure/event-bus/redis/redis-client.module';
import { RedisClientService } from '@libs/common/infrastructure/event-bus/redis/redis-client.service';
import { Module } from '@nestjs/common';
import { PaymentService } from '@payment/application/services/payment.service';
import { CreatePaymentUseCase } from '@payment/application/usecases/create-payment.usecase';
import { UpdatePaymentStatusUseCase } from '@payment/application/usecases/update-payment-status.usecase';
import { IPaymentRepository } from '@payment/domain/repositories/payment.repository.interface';
import { PaymentController } from '@payment/presentation/controllers/payment.controller';
import { PaymentSubscriber } from '@payment/presentation/subscribers/payment.subcriber';
import { PersistencyModule } from '../persistency/persistency.module';

@Module({
  imports: [PersistencyModule, RedisClientModule],
  controllers: [PaymentController, PaymentSubscriber],
  providers: [
    {
      provide: PaymentService,
      useFactory: (
        createUseCase: CreatePaymentUseCase,
        updateStatusUseCase: UpdatePaymentStatusUseCase,
        eventPublisherClient: RedisClientService,
      ) =>
        new PaymentService(
          createUseCase,
          updateStatusUseCase,
          new EventPublisherService(eventPublisherClient),
        ),
      inject: [CreatePaymentUseCase, UpdatePaymentStatusUseCase, RedisClientService],
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
  ],
})
export class PaymentModule {}
