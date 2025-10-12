export abstract class IValidator {
  protected nextValidator: IValidator;

  setNext(validator: IValidator): IValidator {
    this.nextValidator = validator;
    return validator;
  }

  async validate(input: any): Promise<void> {
    if (this.nextValidator) {
      await this.nextValidator.validate(input);
    }
  }
}
