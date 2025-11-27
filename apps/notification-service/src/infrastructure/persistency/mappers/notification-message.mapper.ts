/**
 * Infrastructure Layer - Notification Message Mapper
 * Converts between domain entities and persistence entities
 */

import { NotificationMessage } from '../../../domain/entities/notification-message';
import { NotificationMessageEntity } from '../entities/notification-message.entity';

export class NotificationMessageMapper {
  /**
   * Convert domain entity to persistence entity
   */
  static toPersistence(domain: NotificationMessage): NotificationMessageEntity {
    const entity = new NotificationMessageEntity();
    if (domain.id) entity.id = domain.id;
    entity.recipient = domain.recipient;
    entity.subject = domain.subject;
    entity.message = domain.message;
    entity.status = domain.status;
    entity.messageType = domain.messageType;
    entity.externalMessageId = domain.externalMessageId;
    entity.errorMessage = domain.errorMessage;
    entity.sentAt = domain.sentAt;
    entity.correlationId = domain.correlationId;
    return entity;
  }

  /**
   * Convert persistence entity to domain entity
   */
  static toDomain(persistence: NotificationMessageEntity): NotificationMessage {
    return new NotificationMessage({
      id: persistence.id,
      recipient: persistence.recipient,
      subject: persistence.subject,
      message: persistence.message,
      status: persistence.status,
      messageType: persistence.messageType,
      externalMessageId: persistence.externalMessageId,
      errorMessage: persistence.errorMessage,
      sentAt: persistence.sentAt,
      correlationId: persistence.correlationId,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  }
}
