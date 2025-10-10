import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'carts' })
export class CartEntity extends Base {
  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  unitPrice: number;

  // Thành tiền cho dòng này
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  lineAmount: number;
}
