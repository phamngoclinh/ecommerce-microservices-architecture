import path from 'path';
import { DataSource } from 'typeorm';

const OrderDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.ORDER_DB_DATABASE || 'data/order_db.sqlite',
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  logging: false,
});

export default OrderDataSource;
