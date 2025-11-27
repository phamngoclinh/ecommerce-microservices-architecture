/**
 * Presentation Layer - Notification Controller
 * Handles HTTP requests and delegates to use cases
 */

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
} from '@nestjs/common';

import { GetDeliveryStatsUseCase } from '@notification/application/usecases/get-delivery-stats.usecase';
import { GetFailedMessagesUseCase } from '@notification/application/usecases/get-failed-messages.usecase';
import {
  GetMessageHistoryUseCase,
  MessageHistoryQuery,
} from '@notification/application/usecases/get-message-history.usecase';
import { GetRecipientHistoryUseCase } from '@notification/application/usecases/get-recipient-history.usecase';
import {
  SendEmailCommand,
  SendEmailUseCase,
} from '@notification/application/usecases/send-email.usecase';
import { DeliveryStatsDto, MessageHistoryQueryDto, SendEmailDto } from '../dtos/notification.dto';

@Controller()
export class NotificationMessageController {
  private readonly logger = new Logger(NotificationMessageController.name);

  constructor(
    private readonly sendEmailUseCase: SendEmailUseCase,
    private readonly getMessageHistoryUseCase: GetMessageHistoryUseCase,
    private readonly getDeliveryStatsUseCase: GetDeliveryStatsUseCase,
    private readonly getRecipientHistoryUseCase: GetRecipientHistoryUseCase,
    private readonly getFailedMessagesUseCase: GetFailedMessagesUseCase,
  ) {}

  @Post('send-email')
  async sendEmail(@Body() dto: SendEmailDto) {
    try {
      this.logger.debug(`Sending email to ${dto.to}`);

      const command: SendEmailCommand = {
        recipient: dto.to,
        subject: dto.subject,
        message: dto.message,
        correlationId: dto.correlationId,
      };

      const result = await this.sendEmailUseCase.execute(command);

      return {
        success: result.success,
        messageId: result.messageId,
        externalMessageId: result.externalMessageId,
        error: result.error,
      };
    } catch (error) {
      this.logger.error(
        `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new HttpException(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to send email',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('message-history')
  async getMessageHistory(@Query() query: MessageHistoryQueryDto) {
    try {
      this.logger.debug('Fetching message history');

      const messageHistoryQuery: MessageHistoryQuery = {
        recipient: query.recipient,
        startDate: query.startDate ? new Date(query.startDate) : undefined,
        endDate: query.endDate ? new Date(query.endDate) : undefined,
        limit: query.limit ? parseInt(query.limit, 10) : undefined,
      };

      return await this.getMessageHistoryUseCase.execute(messageHistoryQuery);
    } catch (error) {
      this.logger.error(
        `Failed to get message history: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new HttpException(
        {
          error: 'Failed to retrieve message history',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('delivery-stats')
  async getDeliveryStats(@Query('hours') hours?: string): Promise<DeliveryStatsDto> {
    try {
      const hoursParsed = hours ? parseInt(hours, 10) : 24;
      this.logger.debug(`Fetching delivery stats for last ${hoursParsed} hours`);
      return await this.getDeliveryStatsUseCase.execute(hoursParsed);
    } catch (error) {
      this.logger.error(
        `Failed to get delivery stats: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new HttpException(
        {
          error: 'Failed to retrieve delivery statistics',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('recipient-history')
  async getRecipientHistory(@Query('recipient') recipient: string) {
    try {
      if (!recipient) {
        throw new HttpException(
          {
            error: 'Recipient email is required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      this.logger.debug(`Fetching recipient history for ${recipient}`);
      return await this.getRecipientHistoryUseCase.execute(recipient);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(
        `Failed to get recipient history: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new HttpException(
        {
          error: 'Failed to retrieve recipient history',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('failed-messages')
  async getFailedMessages(@Query('limit') limit?: string) {
    try {
      const limitParsed = limit ? parseInt(limit, 10) : 100;
      this.logger.debug(`Fetching failed messages (limit: ${limitParsed})`);
      return await this.getFailedMessagesUseCase.execute(limitParsed);
    } catch (error) {
      this.logger.error(
        `Failed to get failed messages: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new HttpException(
        {
          error: 'Failed to retrieve failed messages',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
