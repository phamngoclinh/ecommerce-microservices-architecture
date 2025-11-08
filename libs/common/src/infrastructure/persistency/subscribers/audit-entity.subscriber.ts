import { SYSTEM_USER_ID } from '@libs/common/application/constants/system-ids';
import type { IApplicationContext } from '@libs/common/modules/context/application-context.interface';
import { APPLICATION_CONTEXT } from '@libs/common/modules/context/application-context.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

@Injectable()
@EventSubscriber()
export class AuditEntitySubscriber implements EntitySubscriberInterface<BaseEntity> {
  constructor(
    dataSource: DataSource,
    @Inject(APPLICATION_CONTEXT)
    private readonly appContext: IApplicationContext,
  ) {
    dataSource.subscribers.push(this);
    this.appContext = appContext;
  }

  listenTo() {
    return BaseEntity;
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    const userId = this.appContext.getUserId();
    if (userId) {
      event.entity.createdBy = userId;
      event.entity.updatedBy = userId;
    } else {
      event.entity.createdBy = SYSTEM_USER_ID;
      event.entity.updatedBy = SYSTEM_USER_ID;
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    const userId = this.appContext.getUserId();

    if (userId) {
      (event.entity as BaseEntity).updatedBy = userId;
    } else if ((event.entity as BaseEntity).updatedBy === undefined) {
      (event.entity as BaseEntity).updatedBy = SYSTEM_USER_ID;
    }
  }
}
