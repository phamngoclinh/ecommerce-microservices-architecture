/**
 * Application Layer - Send Email Use Case
 * Orchestrates the process of sending an email and persisting it
 */

import { Injectable, Logger } from '@nestjs/common';
import { MessageType, NotificationMessage } from '../../domain/entities/notification-message';
import { SendResult } from '../../domain/entities/send-result';
import { MessageCreatedEvent, MessageFailedEvent, MessageSentEvent } from '../../domain/events';
import type { INotificationMessageRepository } from '../../domain/repositories/notification-message.repository';
import type { IEmailProvider } from '../ports/email-provider.port';
import type { IDomainEventBus } from '../ports/event-bus.port';

export interface SendEmailCommand {
  recipient: string;
  subject: string;
  message: string;
  correlationId?: string;
}

@Injectable()
export class SendEmailUseCase {
  private readonly logger = new Logger(SendEmailUseCase.name);

  constructor(
    private readonly repository: INotificationMessageRepository,
    private readonly emailProvider: IEmailProvider,
    private readonly eventBus: IDomainEventBus,
  ) {}

  async execute(command: SendEmailCommand): Promise<SendResult> {
    try {
      // 1. Create pending message in domain
      const domainMessage = NotificationMessage.createPending(
        command.recipient,
        command.subject,
        command.message,
        MessageType.EMAIL,
        command.correlationId,
      );

      // 2. Persist as pending
      const persistedMessage = await this.repository.save(domainMessage);
      await this.eventBus.publish(new MessageCreatedEvent(persistedMessage.id!, persistedMessage));

      this.logger.debug(`Message ${persistedMessage.id} created and pending`);

      // 3. Send via provider
      const externalMessageId = await this.emailProvider.send({
        to: command.recipient,
        subject: command.subject,
        html: command.message,
      });

      // 4. Mark as sent in domain
      persistedMessage.markAsSent(externalMessageId);

      // 5. Persist sent status
      const sentMessage = await this.repository.save(persistedMessage);
      await this.eventBus.publish(new MessageSentEvent(sentMessage.id!, sentMessage));

      this.logger.log(`Email sent successfully: ID ${sentMessage.id} to ${command.recipient}`);

      return SendResult.success(sentMessage.id!, externalMessageId);
    } catch (error) {
      return this.handleSendError(command, error);
    }
  }

  private async handleSendError(command: SendEmailCommand, error: Error): Promise<SendResult> {
    this.logger.error(`Failed to send email to ${command.recipient}: ${error.message}`);

    try {
      // Try to find and mark the message as failed
      // This assumes the message was created before the send attempt failed
      // In a production system, you might want to search by correlation ID or other means
      const failedMessage = await this.findMostRecentMessageForRecipient(command.recipient);

      if (failedMessage) {
        failedMessage.markAsFailed(error.message);
        const updatedMessage = await this.repository.save(failedMessage);
        await this.eventBus.publish(
          new MessageFailedEvent(updatedMessage.id!, updatedMessage, error.message),
        );
        return SendResult.failure(updatedMessage.id!, error.message);
      }
    } catch (dbError) {
      this.logger.error(
        `Failed to update failed message status: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`,
      );
    }

    throw error;
  }

  private async findMostRecentMessageForRecipient(
    recipient: string,
  ): Promise<NotificationMessage | null> {
    const messages = await this.repository.findByRecipient(recipient);
    return messages.length > 0 ? messages[0] : null;
  }
}
