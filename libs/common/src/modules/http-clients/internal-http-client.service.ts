import {
  APPLICATION_CONTEXT,
  IApplicationContext,
} from '@libs/common/modules/context/application-context.interface';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class InternalHttpClientService {
  constructor(
    private readonly http: HttpService,
    @Inject(APPLICATION_CONTEXT)
    private readonly applicationContext: IApplicationContext,
  ) {}

  async post<TInput, TOutput>(url: string, data: TInput): Promise<TOutput> {
    try {
      const response = await this.http.axiosRef.post(url, data, {
        headers: {
          mode: 'cors',
          'Content-Type': 'application/json',
          'x-internal-user-id': this.applicationContext.getUserId(),
          'x-internal-user-role': this.applicationContext.getUserRole(),
          'x-internal-user-scope': this.applicationContext.getScope(),
        },
      });
      return response.data as TOutput;
    } catch (error: any) {
      console.error(error);
      throw Error(`Failed to calling ${url}!`);
    }
  }
}
