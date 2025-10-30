import path from 'path';
import { DataSource } from 'typeorm';

const CatalogDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.CATALOG_DB_DATABASE || 'data/catalog_db.sqlite',
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  logging: true,
});

export default CatalogDataSource;
