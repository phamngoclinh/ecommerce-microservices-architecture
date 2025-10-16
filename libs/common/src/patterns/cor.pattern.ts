export abstract class CoRHandler<TContext> {
  protected nextHandler?: CoRHandler<TContext>;

  setNext(next: CoRHandler<TContext>): CoRHandler<TContext> {
    this.nextHandler = next;
    return next;
  }

  async handle(context: TContext): Promise<void> {
    if (this.nextHandler) {
      await this.nextHandler.handle(context);
    }
  }
}
