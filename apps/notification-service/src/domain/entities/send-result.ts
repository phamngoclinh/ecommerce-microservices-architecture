/**
 * Domain Layer - Result Value Object
 * Represents the result of a send operation
 */

export interface ISendResult {
  success: boolean;
  messageId: number;
  externalMessageId?: string;
  error?: string;
}

export class SendResult implements ISendResult {
  success: boolean;
  messageId: number;
  externalMessageId?: string;
  error?: string;

  private constructor(props: ISendResult) {
    this.success = props.success;
    this.messageId = props.messageId;
    this.externalMessageId = props.externalMessageId;
    this.error = props.error;
  }

  static success(messageId: number, externalMessageId?: string): SendResult {
    return new SendResult({
      success: true,
      messageId,
      externalMessageId,
    });
  }

  static failure(messageId: number, error: string): SendResult {
    return new SendResult({
      success: false,
      messageId,
      error,
    });
  }
}
