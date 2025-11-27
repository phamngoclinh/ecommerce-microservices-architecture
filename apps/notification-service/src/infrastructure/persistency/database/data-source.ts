import path from 'path';
import { DataSource } from 'typeorm';

const NotificationDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NOTIFICATION_DB_HOST,
  port: Number(process.env.NOTIFICATION_DB_PORT),
  username: process.env.NOTIFICATION_DB_USER,
  password: process.env.NOTIFICATION_DB_PASSWORD,
  database: process.env.NOTIFICATION_DB_DATABASE,
  schema: process.env.NOTIFICATION_DB_SCHEMA,
  entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  logging: false,
});

export default NotificationDataSource;
