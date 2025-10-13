export abstract class IUsecase<TInput, TOutput> {
  abstract execute(input: TInput, ...args: any): Promise<TOutput>;
}
