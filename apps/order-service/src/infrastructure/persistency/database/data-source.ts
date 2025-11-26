import path from 'path';
import { DataSource } from 'typeorm';

const OrderDataSource = new DataSource({
  type: 'postgres',
  host: process.env.ORDER_DB_HOST,
  port: Number(process.env.ORDER_DB_PORT),
  username: process.env.ORDER_DB_USER,
  password: process.env.ORDER_DB_PASSWORD,
  database: process.env.ORDER_DB_DATABASE,
  schema: process.env.ORDER_DB_SCHEMA,
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  logging: false,
});

export default OrderDataSource;
