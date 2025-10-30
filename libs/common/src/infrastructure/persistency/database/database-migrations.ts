import { DataSource } from 'typeorm';

export class DatabaseMigrations {
  static async autoMigrations(dataSource: DataSource) {
    if (process.env.NODE_ENV === 'production') {
      await dataSource.initialize();
      const migrations = await dataSource.showMigrations();
      if (migrations) {
        console.log('Running migrations...');
        await dataSource.runMigrations();
        console.log('Migrations completed.');
      }
    }
  }
}
