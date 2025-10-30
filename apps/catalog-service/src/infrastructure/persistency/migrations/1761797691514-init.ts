import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761797691514 implements MigrationInterface {
    name = 'Init1761797691514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar(255) NOT NULL,
                "price" decimal(15, 2) NOT NULL,
                "status" varchar CHECK("status" IN ('ACTIVE', 'INACTIVE', 'DRAFT')) NOT NULL DEFAULT ('ACTIVE')
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "products"
        `);
    }

}
