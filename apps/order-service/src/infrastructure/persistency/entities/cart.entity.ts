import { Base } from '@libs/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity extends Base {
  @Column({ name: 'product_id', type: 'int', nullable: false })
  productId: number;

  @Column({ name: 'product_name', type: 'varchar', nullable: true })
  productName: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 15, scale: 2, nullable: false })
  unitPrice: number;

  // Thành tiền cho dòng này
  @Column({ name: 'line_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  lineAmount: number;
}
