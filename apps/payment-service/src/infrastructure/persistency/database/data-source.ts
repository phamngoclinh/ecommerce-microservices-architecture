import path from 'path';
import { DataSource } from 'typeorm';

const PaymentDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PAYMENT_DB_HOST,
  port: Number(process.env.PAYMENT_DB_PORT),
  username: process.env.PAYMENT_DB_USER,
  password: process.env.PAYMENT_DB_PASSWORD,
  database: process.env.PAYMENT_DB_DATABASE,
  schema: process.env.PAYMENT_DB_SCHEMA,
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  logging: false,
});

export default PaymentDataSource;
