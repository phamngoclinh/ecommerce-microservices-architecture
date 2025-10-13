export abstract class IValidator<TContext> {
  protected nextValidator: IValidator<TContext>;

  setNext(validator: IValidator<TContext>): IValidator<TContext> {
    this.nextValidator = validator;
    return validator;
  }

  async handle(context: TContext): Promise<void> {
    await this.validate(context);
    if (this.nextValidator) {
      await this.nextValidator.handle(context);
    }
  }

  protected abstract validate(context: TContext): Promise<void>;
}
