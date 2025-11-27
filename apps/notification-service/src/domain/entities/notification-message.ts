/**
 * Domain Layer - Notification Message Value Object
 * Represents a notification message in the domain model
 */

export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

export enum MessageType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export interface INotificationMessage {
  id?: number;
  recipient: string;
  subject: string;
  message: string;
  status: MessageStatus;
  messageType: MessageType;
  externalMessageId?: string;
  errorMessage?: string;
  sentAt?: Date;
  correlationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class NotificationMessage implements INotificationMessage {
  id?: number;
  recipient: string;
  subject: string;
  message: string;
  status: MessageStatus;
  messageType: MessageType;
  externalMessageId?: string;
  errorMessage?: string;
  sentAt?: Date;
  correlationId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: INotificationMessage) {
    this.id = props.id;
    this.recipient = props.recipient;
    this.subject = props.subject;
    this.message = props.message;
    this.status = props.status;
    this.messageType = props.messageType;
    this.externalMessageId = props.externalMessageId;
    this.errorMessage = props.errorMessage;
    this.sentAt = props.sentAt;
    this.correlationId = props.correlationId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  /**
   * Factory method to create a pending message
   */
  static createPending(
    recipient: string,
    subject: string,
    message: string,
    messageType: MessageType = MessageType.EMAIL,
    correlationId?: string,
  ): NotificationMessage {
    return new NotificationMessage({
      recipient,
      subject,
      message,
      status: MessageStatus.PENDING,
      messageType,
      correlationId,
    });
  }

  /**
   * Mark message as sent
   */
  markAsSent(externalMessageId?: string): void {
    if (this.status === MessageStatus.PENDING) {
      this.status = MessageStatus.SENT;
      this.sentAt = new Date();
      this.externalMessageId = externalMessageId;
    }
  }

  /**
   * Mark message as failed
   */
  markAsFailed(errorMessage: string): void {
    if (this.status === MessageStatus.PENDING) {
      this.status = MessageStatus.FAILED;
      this.errorMessage = errorMessage;
    }
  }

  /**
   * Check if message is pending delivery
   */
  isPending(): boolean {
    return this.status === MessageStatus.PENDING;
  }

  /**
   * Check if message was successfully sent
   */
  isSent(): boolean {
    return this.status === MessageStatus.SENT;
  }

  /**
   * Check if message failed to send
   */
  isFailed(): boolean {
    return this.status === MessageStatus.FAILED;
  }
}
