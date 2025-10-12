import { IValidator } from '@libs/common/validators/validator';

export abstract class IUsecase<TInput, TOutput> {
  protected validator: IValidator;
  abstract execute(input: TInput): Promise<TOutput>;
}
