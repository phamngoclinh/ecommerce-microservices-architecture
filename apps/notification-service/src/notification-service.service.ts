import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationServiceService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail({ subject, message, to }: { subject: string; message: string; to: string }) {
    await this.mailService.sendMail({
      to,
      subject,
      html: message,
    });
  }
}
