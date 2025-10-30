import path from 'path';
import { DataSource } from 'typeorm';

const PaymentDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.PAYMENT_DB_DATABASE || 'data/payment_db.sqlite',
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  logging: false,
});

export default PaymentDataSource;
