// infrastructure/context/cls-app-context.adapter.ts

import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import {
  IApplicationContext,
  IApplicationContextInterface,
  RunCallbackType,
  RunOptionType,
} from './application-context.interface';

@Injectable()
export class ClsApplicationContextAdapter
  extends IApplicationContext
  implements IApplicationContextInterface
{
  constructor(private readonly cls: ClsService) {
    super();
  }

  run<T>(callback: RunCallbackType<T>): Observable<T>;
  run<T>(options: RunOptionType, callback: RunCallbackType<T>): Observable<T>;
  run<T>(...args: any[]) {
    let callback: RunCallbackType<T>;
    if (typeof args[0] === 'function') {
      callback = args[0] as RunCallbackType<T>;
      return this.cls.run<T>(callback);
    }
    const options = args[0] as RunOptionType;
    callback = args[1] as RunCallbackType<T>;
    return this.cls.run<T>(options, callback);
  }

  get(key: string): any {
    return this.cls.get(key);
  }

  set(key: string, value: any): void {
    this.cls.set(key, value);
  }
}
