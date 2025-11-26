import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { NotificationServiceService } from './notification-service.service';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @Post('send-email')
  sendMailer(
    @Body() body: { subject: string; message: string; to: string },
    @Res() response: Response,
  ) {
    const mail = this.notificationServiceService.sendMail(body);

    return response.status(200).json({
      message: 'success',
      mail,
    });
  }
}
