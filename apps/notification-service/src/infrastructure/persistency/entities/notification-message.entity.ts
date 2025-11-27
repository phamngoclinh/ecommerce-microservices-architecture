import { BaseEntity } from '@libs/common/infrastructure/persistency/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

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

@Entity({ name: 'notification_messages' })
@Index(['status'])
@Index(['recipient'])
@Index(['createdAt'])
@Index(['messageType'])
export class NotificationMessageEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  recipient: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  subject: string;

  @Column({
    type: 'text',
  })
  message: string;

  @Column({
    type: 'text',
    enum: MessageStatus,
    default: MessageStatus.PENDING,
  })
  status: MessageStatus;

  @Column({
    type: 'text',
    enum: MessageType,
    default: MessageType.EMAIL,
  })
  messageType: MessageType;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  externalMessageId?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  errorMessage?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  sentAt?: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  correlationId?: string;
}
