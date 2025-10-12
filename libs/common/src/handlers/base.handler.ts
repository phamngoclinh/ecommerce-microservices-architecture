export abstract class BaseHandler<T> {
  protected nextHandler?: BaseHandler<T>;

  setNext(next: BaseHandler<T>): BaseHandler<T> {
    this.nextHandler = next;
    return next;
  }

  async handle(context: T): Promise<void> {
    if (this.nextHandler) {
      await this.nextHandler.handle(context);
    }
  }
}
