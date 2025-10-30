import path from 'path';
import { DataSource } from 'typeorm';

const InventoryDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.INVENTORY_DB_DATABASE || 'data/inventory_db.sqlite',
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  logging: true,
});

export default InventoryDataSource;
