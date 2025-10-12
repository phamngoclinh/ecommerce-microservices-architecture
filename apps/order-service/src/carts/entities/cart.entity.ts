import { Entity, Column } from 'typeorm';
import { Base } from '@libs/database/entities/base.entity';

@Entity({ name: 'carts' })
export class CartEntity extends Base {
  @Column({ type: 'int', nullable: false })
  productId: number;

  @Column({ type: 'varchar', nullable: true })
  productName: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  unitPrice: number;

  // Thành tiền cho dòng này
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  lineAmount: number;
}
