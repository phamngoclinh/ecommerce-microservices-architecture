import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'warehouses' })
export class Warehouse extends Base {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;
}
