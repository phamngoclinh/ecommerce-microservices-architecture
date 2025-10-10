import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Supplier } from './entities/supplier.entity';
import { Inventory } from './entities/inventory.entity';
import { Payment } from './entities/payment.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehousesRepository: Repository<Warehouse>,
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventorysRepository: Repository<Inventory>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async createWarehouse(warehouse: DeepPartial<Warehouse>): Promise<Warehouse> {
    const result = this.warehousesRepository.create(warehouse);
    await this.warehousesRepository.save(result);
    return result;
  }

  getWarehouses(): Promise<Warehouse[] | null> {
    return this.warehousesRepository.find();
  }

  getWarehouse(warehouseId: number): Promise<Warehouse | null> {
    return this.warehousesRepository.findOne({ where: { id: warehouseId } });
  }

  async createSupplier(supplier: DeepPartial<Supplier>): Promise<Supplier> {
    const result = this.suppliersRepository.create(supplier);
    await this.suppliersRepository.save(supplier);
    return result;
  }

  getSupplier(supplierId: number): Promise<Supplier | null> {
    return this.suppliersRepository.findOne({ where: { id: supplierId } });
  }

  async createProduct(product: DeepPartial<Product>): Promise<Product> {
    const result = this.productsRepository.create(product);
    await this.productsRepository.save(product);
    return result;
  }

  getProducts(): Promise<Product[] | null> {
    return this.productsRepository.find();
  }

  getProduct(productId: number): Promise<Product | null> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  async receiveIntoInventory(inventory: DeepPartial<Inventory>): Promise<Inventory> {
    const result = this.inventorysRepository.create(inventory);
    await this.inventorysRepository.save(result);
    return result;
  }

  checkStockIn(productId: number): Promise<Inventory | null> {
    return this.inventorysRepository.findOne({
      where: {
        product: {
          id: productId,
        },
      },
    });
  }

  async createOrder(order: DeepPartial<Order>): Promise<Order> {
    const result = this.ordersRepository.create(order);
    await this.ordersRepository.save(order);
    return result;
  }

  getOrders(): Promise<Order[] | null> {
    return this.ordersRepository.find();
  }

  getOrder(orderId: number): Promise<Order | null> {
    return this.ordersRepository.findOne({ where: { id: orderId } });
  }
}
