import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'products' })
export class ProductEntity extends Base {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  purchasePrice: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  sellingPrice: number;
}
