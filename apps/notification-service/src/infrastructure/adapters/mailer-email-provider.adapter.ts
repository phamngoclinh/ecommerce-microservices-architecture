/**
 * Infrastructure Layer - Email Provider Implementation
 * Adapts the MailerService to the IEmailProvider port
 */

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { IEmailProvider, SendEmailRequest } from '../../application/ports/email-provider.port';

@Injectable()
export class MailerEmailProvider implements IEmailProvider {
  private readonly logger = new Logger(MailerEmailProvider.name);

  constructor(private readonly mailerService: MailerService) {}

  async send(request: SendEmailRequest): Promise<string> {
    try {
      const response = await this.mailerService.sendMail({
        to: request.to,
        subject: request.subject,
        html: request.html,
      });

      this.logger.debug(`Email sent to ${request.to} with ID: ${response?.messageId}`);
      return response?.messageId || `${Date.now()}`;
    } catch (error) {
      this.logger.error(`Failed to send email to ${request.to}:`, error);
      throw error;
    }
  }
}
