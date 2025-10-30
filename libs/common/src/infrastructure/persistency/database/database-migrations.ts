import { DataSource } from 'typeorm';

export class DatabaseMigrations {
  static async autoMigrations(dataSource: DataSource) {
    await dataSource.initialize();
    const migrations = await dataSource.showMigrations();
    if (migrations) {
      console.log('Running migrations...');
      await dataSource.runMigrations();
      console.log('Migrations completed.');
    }
  }
}
