/**
 * Application Layer - Email Provider Port
 * Defines the interface for sending emails
 * Implementation is in infrastructure layer
 */

export interface SendEmailRequest {
  to: string;
  subject: string;
  html: string;
}

export interface IEmailProvider {
  send(request: SendEmailRequest): Promise<string>; // Returns external message ID
}
