import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SupplierEntity } from './supplier.entity';
import { WarehouseEntity } from './warehouse.entity';
import { Base } from './base.entity';

enum STOCK_STATUS {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

@Entity({ name: 'inventories' })
export class InventoryEntity extends Base {
  // Sản phẩm tồn kho
  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  // Nhà cung cấp chính của lô hàng
  @ManyToOne(() => SupplierEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'supplier_id' })
  supplier?: SupplierEntity;

  // Nếu hệ thống có nhiều kho
  @ManyToOne(() => WarehouseEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse?: WarehouseEntity;

  // Số lượng tồn kho hiện tại
  @Column({ type: 'int', default: 0 })
  quantity: number;

  // Ngưỡng cảnh báo nhập thêm
  @Column({ type: 'int', default: 10 })
  reorderLevel: number;

  // Trạng thái tồn kho
  @Column({ type: 'enum', enum: STOCK_STATUS, default: STOCK_STATUS.IN_STOCK })
  status: STOCK_STATUS;

  // @BeforeInsert()
  // @BeforeUpdate()
  // updateStatus() {
  //   if (this.quantity <= 0) this.status = STOCK_STATUS.OUT_OF_STOCK;
  //   else if (this.quantity < this.reorderLevel) this.status = STOCK_STATUS.LOW_STOCK;
  //   else this.status = STOCK_STATUS.IN_STOCK;
  // }
}
