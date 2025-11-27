/**
 * Infrastructure Layer - DI Provider Tokens
 * Defines tokens for dependency injection
 */

export const NOTIFICATION_MESSAGE_REPOSITORY = Symbol('INotificationMessageRepository');
export const EMAIL_PROVIDER = Symbol('IEmailProvider');
export const DOMAIN_EVENT_BUS = Symbol('IDomainEventBus');
