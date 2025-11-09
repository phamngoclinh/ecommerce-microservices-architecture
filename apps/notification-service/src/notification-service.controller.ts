import { Body, Controller, Post } from '@nestjs/common';
import * as webpush from 'web-push';
import { NotificationServiceService } from './notification-service.service';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @Post('subscribe')
  subscribe(@Body() subscription: webpush.PushSubscription): { message: string } {
    console.log('Received subscription:', subscription);
    this.notificationServiceService.saveSubscription(subscription);
    return { message: 'Subscription saved' };
  }

  @Post('send-notification')
  async sendNotification(@Body() data: { title: string; body: string }) {
    const subscriptions = this.notificationServiceService.getSubscriptions();
    const payload = JSON.stringify(data);

    // Gửi thông báo đến tất cả các subscriptions đã lưu
    for (const sub of subscriptions) {
      await this.notificationServiceService.sendNotification(sub, payload);
    }

    return { message: 'Notifications sent to all subscribers' };
  }
}
