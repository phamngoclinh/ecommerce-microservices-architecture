/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as webpush from 'web-push';

@Injectable()
export class NotificationServiceService {
  private subscriptions: webpush.PushSubscription[] = []; // Lưu tạm

  constructor(private readonly config: ConfigService) {
    // Cấu hình web-push với VAPID keys và thông tin liên hệ
    webpush.setVapidDetails(
      'mailto: <test@example.com>',
      this.config.get<string>('VAPID_PUBLIC_KEY'),
      this.config.get<string>('VAPID_PRIVATE_KEY'),
    );
  }

  // Hàm để gửi thông báo đến một subscription cụ thể
  async sendNotification(subscription: webpush.PushSubscription, payload: string) {
    try {
      await webpush.sendNotification(subscription, payload);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      // Xử lý các lỗi, ví dụ: nếu subscription đã hết hạn, xóa nó khỏi DB
      if (error.statusCode === 410) {
        console.log('Subscription expired/gone. Need to remove from DB.');
      }
    }
  }

  saveSubscription(subscription: webpush.PushSubscription): void {
    this.subscriptions.push(subscription);
  }

  getSubscriptions(): webpush.PushSubscription[] {
    return this.subscriptions;
  }
}
