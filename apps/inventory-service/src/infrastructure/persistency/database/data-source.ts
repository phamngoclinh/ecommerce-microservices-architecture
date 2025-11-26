import path from 'path';
import { DataSource } from 'typeorm';

const InventoryDataSource = new DataSource({
  type: 'postgres',
  host: process.env.INVENTORY_DB_HOST,
  port: Number(process.env.INVENTORY_DB_PORT),
  username: process.env.INVENTORY_DB_USER,
  password: process.env.INVENTORY_DB_PASSWORD,
  database: process.env.INVENTORY_DB_DATABASE,
  schema: process.env.INVENTORY_DB_SCHEMA,
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  logging: false,
});

export default InventoryDataSource;
