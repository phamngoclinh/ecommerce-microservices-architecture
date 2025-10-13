import { ProductStatus } from '@catalog/domain/entities/product.entity';
import { Base } from '@libs/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends Base {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  price: number;

  // Trạng thái
  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;
}
